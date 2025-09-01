import * as amplitude from "@amplitude/analytics-browser";
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
	getLocalStorageItem,
	getTopSites,
	initAmplitude,
	isActiveSubscription,
	isBuildTargetWeb,
	isDeepEqual,
	isObjectEmpty,
	preCacheFutureBackgroundImages,
	setExtensionStorageItem,
	setLocalStorageItem,
	shouldShiftBackgrounds,
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
	const { setAxiosBaseURL, setAxiosIntercept } = useAxios();
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

			// signUpUser in extension, if userId absent in storage and token absent in cookies
			if (!!auth?.userId === false) {
				if (isBuildTargetWeb === false) {
					const token = await getBrowserCookieItem(TOKEN);
					if (!token) {
						const response = await signUpUser();
						if (response?.success) {
							auth = { ...auth, ...response.auth };
						}
					}
				}
			}

			const {
				backgrounds,
				backgroundsSettings,
				bookmarksVisible,
				bookmarksSettings: { defaultMostVisited, includeMostVisited },
			} = userCustomization;
			if (bookmarksVisible && isBuildTargetWeb === false)
				userCustomization = {
					...userCustomization,
					bookmarks: await getBookmarks(),
					topSites:
						defaultMostVisited || includeMostVisited
							? await getTopSites()
							: userCustomization.topSites,
				};
			const shiftBackgrounds = shouldShiftBackgrounds(
				backgrounds,
				backgroundsSettings,
			);
			if (shiftBackgrounds) {
				backgrounds.shift();
				// Fallback purpose in offline scenario
				userCustomization.backgroundsSettings.updatedDate =
					new Date().toISOString();
			}

			setStorageAuth(auth);
			setStorageUserCustomization(userCustomization);
			setStorageNetworkQueue(networkQueue);
			setWidgetReady({ widget: STORAGE, type: "data" });
			initAmplitude(auth);
		})();
	}, []);

	// Review subscriptionSummary onChange userId
	useEffect(() => {
		(async () => {
			if (isObjectEmpty(storageAuth)) return;

			amplitude.setUserId(storageAuth.userId);

			const { subscriptionSummary } = storageAuth;
			if (subscriptionSummary.plan) {
				const isActive = isActiveSubscription(subscriptionSummary);
				if (isActive === false) {
					setSubscriptionSummary({ plan: null });
					toggleOffPlusAddOns();
				}
			} else {
				toggleOffPlusAddOns();
			}
		})();
	}, [storageAuth.userId]);

	// Syncs auth and customization with server onReady storage, and pre-caches backgrounds
	useEffect(() => {
		let serverTimeout;
		(async () => {
			if (widgetManager.data[SERVER].ready) return;
			if (widgetManager.data[STORAGE].ready) {
				const setServerReady = () =>
					setWidgetReady({ widget: SERVER, type: "data" });

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
					const isProfileDetailsRequested = storageAuth.email
						? !storageAuth.profilePictureUrl && !storageAuth.fullName
						: true;
					setServerReady();
					const response = await getUserSettings(isProfileDetailsRequested);
					if (response?.success) {
						let { auth, customization } = response;
						await setStorageAuth((prevAuth) =>
							addOrMergeObjectProperties(prevAuth, auth),
						);
						if (!!customization) {
							await setStorageUserCustomization((prevCustomization) =>
								addOrMergeObjectProperties(
									prevCustomization,
									customization,
									true,
								),
							);
							preCacheFutureBackgroundImages(
								customization.backgrounds,
								isBuildTargetWeb,
							);
						}
					}
				}
			}
		})();

		return () => clearTimeout(serverTimeout);
	}, [widgetManager.data[STORAGE].ready]);

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
							}
						} else if (key === NETWORK_QUEUE) {
							setStorageNetworkQueue(newValue);
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
