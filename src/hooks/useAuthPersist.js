import * as amplitude from "@amplitude/analytics-browser";
import { jwtDecode } from "jwt-decode";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import {
	useAuth,
	useAuthActions,
	useAxios,
	useNetworkQueue,
	useUserActions,
	useUserCustomization,
} from "../hooks";
import {
	AUTH,
	CUSTOMIZATION,
	CUSTOMIZATION_FREEMIUM_CONFIGURATION,
	DEFAULT_AUTHENTICATION,
	DEFAULT_CUSTOMIZATION,
	DEFAULT_NETWORK_QUEUE,
	NETWORK_QUEUE,
	SERVER,
	STORAGE,
	TOKEN,
	addOrMergeObjectProperties,
	getBookmarks,
	getBrowserCookieItem,
	getExtensionStorageItem,
	getLocalCookieItem,
	getLocalStorageItem,
	getTopSites,
	initAmplitude,
	isActiveSubscription,
	isBuildTargetWeb,
	isDeepEqual,
	isObjectEmpty,
	omitObjectProperties,
	setBrowserCookieItem,
	setExtensionStorageItem,
	setLocalCookieItem,
	setLocalStorageItem,
} from "../utils";

const DEBOUNCE_TIME = 1;
const MAX_DEBOUNCE_TIME = 10;
const SERVER_TIMEOUT = 0.5;

const getStorageItem = isBuildTargetWeb
	? getLocalStorageItem
	: getExtensionStorageItem;
const setStorageItem = isBuildTargetWeb
	? setLocalStorageItem
	: setExtensionStorageItem;
const getCookieItem = isBuildTargetWeb
	? getLocalCookieItem
	: getBrowserCookieItem;
const setCookieItem = isBuildTargetWeb
	? setLocalCookieItem
	: setBrowserCookieItem;

export const useAuthPersist = () => {
	const { storageAuth, setStorageAuth } = useAuth();
	const {
		postUserData,
		debouncedPostUserData,
		deleteUserData,
		getUserSettings,
		setSubscriptionSummary,
		signUpUser,
	} = useAuthActions();
	const { setAxiosAuthHeader, setAxiosBaseURL, setAxiosIntercept } = useAxios();
	const { storageNetworkQueue, setStorageNetworkQueue } = useNetworkQueue();
	const {
		storageUserCustomization,
		setStorageUserCustomization,
		networkRequestManager,
		widgetManager,
		showApps,
		showMainView,
	} = useUserCustomization();
	const { setWidgetReady, toggleOffPlusAddOns } = useUserActions();
	let userCustomizationRef = useRef(storageUserCustomization);
	let isTokenFromCookie = useRef(false);
	let customizationPlusConfiguration = useRef({});
	let isActiveSubscriptionFromToken = useRef(false);

	// Transits from overlay to main-view onReady widgetManager
	useEffect(() => {
		(async () => {
			if (
				Object.values({ ...widgetManager.app, ...widgetManager.data }).every(
					(widget) =>
						widget.ready === true ||
						storageUserCustomization[widget.visibilityKey] === false,
				)
			) {
				showMainView();
				showApps();
			}
		})();
	}, [widgetManager]);

	// Initializes storageAuth, storageUserCustomization and storageNetworkQueue
	useEffect(() => {
		(async () => {
			let auth = await getStorageItem(AUTH);
			let userCustomization = await getStorageItem(CUSTOMIZATION);
			let networkQueue = await getStorageItem(NETWORK_QUEUE);

			if (isObjectEmpty(auth)) auth = DEFAULT_AUTHENTICATION;
			if (isObjectEmpty(userCustomization))
				userCustomization = DEFAULT_CUSTOMIZATION;
			if (isObjectEmpty(networkQueue)) networkQueue = DEFAULT_NETWORK_QUEUE;

			setAxiosBaseURL();
			setAxiosIntercept();

			/*
				For extension, if token doesn't exist in storage
					if tokenFromCookie exists, reset storage and set isTokenFromCookie which fetches profileDetails
					else signUpUser
				For web, even if token exists in storage
						if tokenFromCookie exists, comapre both tokens
							if different, reset storage and set isTokenFromCookie which fetches profileDetails
			*/
			if (!!auth?.token === false || isBuildTargetWeb) {
				const tokenFromCookie = await getCookieItem(TOKEN);
				if (tokenFromCookie) {
					const isWebAndMismatchedToken =
						isBuildTargetWeb && auth?.token !== tokenFromCookie;
					if (isBuildTargetWeb === false || isWebAndMismatchedToken) {
						isTokenFromCookie.current = true;
						auth = DEFAULT_AUTHENTICATION;
						auth.token = tokenFromCookie;
						userCustomization = DEFAULT_CUSTOMIZATION;
					}
				} else if (isBuildTargetWeb === false) {
					const response = await signUpUser();
					if (response?.success) {
						auth = { ...auth, ...response.auth };
					}
				}
			}

			const {
				bookmarksVisible,
				bookmarksSettings: { includeMostVisited },
			} = userCustomization;
			if (bookmarksVisible && isBuildTargetWeb === false)
				userCustomization = {
					...userCustomization,
					bookmarks: await getBookmarks(),
					topSites: includeMostVisited
						? await getTopSites()
						: userCustomization.topSites,
				};

			setStorageAuth(auth);
			setStorageUserCustomization(userCustomization);
			setStorageNetworkQueue(networkQueue);
			setWidgetReady({ widget: STORAGE, type: "data" });
			initAmplitude(auth);
		})();
	}, []);

	// Updates Authorization, cookie and review subscriptionSummary onChange token
	useEffect(() => {
		(async () => {
			if (isObjectEmpty(storageAuth)) return;

			setAxiosAuthHeader(storageAuth.token);
			setCookieItem(TOKEN, storageAuth?.token ? storageAuth.token : "");
			amplitude.setUserId(storageAuth.userId);

			let decodedPayload;
			try {
				decodedPayload = jwtDecode(storageAuth.token);
			} catch (error) {
				decodedPayload = { subscriptionSummary: {} };
			}
			const { subscriptionSummary } = decodedPayload;
			const subscriptionPlanFromStorage = storageAuth.subscriptionSummary.plan;
			const subscriptionPlanFromToken = subscriptionSummary.plan;
			isActiveSubscriptionFromToken.current =
				isActiveSubscription(subscriptionSummary);
			if (subscriptionPlanFromStorage) {
				if (isActiveSubscriptionFromToken.current === false) {
					setSubscriptionSummary({ plan: null });
					toggleOffPlusAddOns();
				} else if (subscriptionPlanFromStorage !== subscriptionPlanFromToken) {
					setSubscriptionSummary({ plan: subscriptionPlanFromToken });
				}
			} else if (
				subscriptionPlanFromToken &&
				isActiveSubscriptionFromToken.current
			) {
				setSubscriptionSummary(subscriptionSummary);
				if (isObjectEmpty(customizationPlusConfiguration.current) === false)
					setStorageUserCustomization((prevCustomization) => ({
						...prevCustomization,
						...customizationPlusConfiguration.current,
					}));
			} else {
				toggleOffPlusAddOns();
			}
		})();
	}, [storageAuth.token]);

	// Syncs auth and customization with server onReady storage
	useEffect(() => {
		let serverTimeout;
		(async () => {
			if (widgetManager.data[SERVER].ready) return;
			if (widgetManager.data[STORAGE].ready) {
				const setServerReady = () =>
					setWidgetReady({ widget: SERVER, type: "data" });
				if (!!storageAuth.token === false) return setServerReady();

				serverTimeout = setTimeout(setServerReady, SERVER_TIMEOUT * 1000);
				let networkQueue = { ...storageNetworkQueue };
				if (navigator.onLine) {
					const processNetworkQueue = async (method, callback) => {
						for (const [key, object] of Object.entries(networkQueue[method])) {
							if (isObjectEmpty(object) === false) {
								const response = await callback(`/${key}`, object);
								if (response?.success) networkQueue[method][key] = {};
							}
						}
					};
					await processNetworkQueue("post", postUserData);
					await processNetworkQueue("delete", deleteUserData);
					setStorageNetworkQueue(networkQueue);
				}
				const response = await getUserSettings(!!isTokenFromCookie.current);
				if (response?.success) {
					let { auth, customization } = response;
					auth = omitObjectProperties(auth, ["subscriptionSummary.plan"]);
					await setStorageAuth((prevAuth) =>
						addOrMergeObjectProperties(prevAuth, auth),
					);
					if (!!customization) {
						if (isActiveSubscriptionFromToken.current === false) {
							const properties = Object.keys(
								CUSTOMIZATION_FREEMIUM_CONFIGURATION,
							);
							customizationPlusConfiguration.current = _.pick(
								customization,
								properties,
							);
							customization = omitObjectProperties(customization, properties);
						}
						await setStorageUserCustomization((prevCustomization) =>
							addOrMergeObjectProperties(
								prevCustomization,
								customization,
								true,
							),
						);
					}
				}
				setServerReady();
			}
		})();

		return () => clearTimeout(serverTimeout);
	}, [widgetManager.data]);

	// Publishes customization to server onChange payload
	useEffect(() => {
		(async () => {
			if (isObjectEmpty(networkRequestManager.payload)) return;
			debouncedPostUserData("/userData", networkRequestManager.payload);
		})();
	}, [networkRequestManager.payload]);

	// Updates auth in storage onChange storageAuth
	useEffect(() => {
		(async () => {
			if (isObjectEmpty(storageAuth)) return;
			const localStorageAuth = await getStorageItem(AUTH);
			if (isDeepEqual(storageAuth, localStorageAuth) === false) {
				await setStorageItem(AUTH, storageAuth);
			}
		})();
	}, [storageAuth]);

	// Updates customization in storage onChange storageUserCustomization
	useEffect(() => {
		(async () => {
			if (isObjectEmpty(storageUserCustomization)) return;
			userCustomizationRef.current = storageUserCustomization;
			const localStorageUserCustomization = await getStorageItem(CUSTOMIZATION);
			if (
				isDeepEqual(storageUserCustomization, localStorageUserCustomization) ===
				false
			) {
				await setStorageItem(CUSTOMIZATION, storageUserCustomization);
			}
		})();
	}, [storageUserCustomization]);

	// Updates networkQueue in storage onChange storageNetworkQueue
	useEffect(() => {
		(async () => {
			if (isObjectEmpty(storageNetworkQueue)) return;
			const localStorageNetworkQueue = await getStorageItem(NETWORK_QUEUE);
			if (
				isDeepEqual(storageNetworkQueue, localStorageNetworkQueue) === false
			) {
				await setStorageItem(NETWORK_QUEUE, storageNetworkQueue);
			}
		})();
	}, [storageNetworkQueue]);

	// storageChangeListener for web
	useEffect(() => {
		(async () => {
			if (isBuildTargetWeb === false) return;

			const storageChangeHandler = (event) => {
				const { key, newValue } = event;
				if ([AUTH, CUSTOMIZATION, NETWORK_QUEUE].includes(key)) {
					const parsedValue = JSON.parse(newValue);
					if (key === AUTH) {
						setStorageAuth(parsedValue);
					} else if (key === CUSTOMIZATION) {
						setStorageUserCustomization(parsedValue);
					} else if (key === NETWORK_QUEUE) {
						setStorageNetworkQueue(parsedValue);
					}
				}
			};
			const debouncedStorageChangeHandler = debounce(
				storageChangeHandler,
				DEBOUNCE_TIME * 1000,
				{
					maxWait: MAX_DEBOUNCE_TIME * 1000,
				},
			);
			window.addEventListener("storage", debouncedStorageChangeHandler);

			return () => {
				window.removeEventListener("storage", debouncedStorageChangeHandler);
				debouncedStorageChangeHandler.cancel();
			};
		})();
	}, []);

	// storageChangeListener for extension
	useEffect(() => {
		(async () => {
			if (isBuildTargetWeb) return;

			const storageChangeHandler = (changes, namespace) => {
				if (namespace !== "local") return;
				for (let [key, { newValue }] of Object.entries(changes)) {
					if ([AUTH, CUSTOMIZATION, NETWORK_QUEUE].includes(key)) {
						if (key === AUTH) {
							setStorageAuth(newValue);
						} else if (key === CUSTOMIZATION) {
							if (
								isDeepEqual(userCustomizationRef.current, newValue) === false
							) {
								setStorageUserCustomization(newValue);
							} else if (key === NETWORK_QUEUE) {
								setStorageNetworkQueue(parsedValue);
							}
						}
					}
				}
			};

			const debouncedStorageChangeHandler = debounce(
				storageChangeHandler,
				DEBOUNCE_TIME * 1000,
				{
					maxWait: MAX_DEBOUNCE_TIME * 1000,
				},
			);

			chrome.storage.onChanged.addListener(debouncedStorageChangeHandler);

			return () => {
				chrome.storage.onChanged.removeListener(debouncedStorageChangeHandler);
				debouncedStorageChangeHandler.cancel();
			};
		})();
	}, []);
};

// TODO: Hotkey for toggling bookmars
