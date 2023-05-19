import { useEffect, useRef } from "react";
import { debounce } from "lodash";
import jwt_decode from "jwt-decode";
import {
	useAuth,
	useAuthActions,
	useAxios,
	useUserActions,
	useUserCustomization,
} from "../hooks";
import {
	AUTH,
	CUSTOMIZATION,
	DEFAULT_AUTHENTICATION,
	DEFAULT_CUSTOMIZATION,
	STORAGE,
	TOKEN,
	getBookmarks,
	getBrowserCookieItem,
	getExtensionStorageItem,
	getLocalCookieItem,
	getLocalStorageItem,
	getTopSites,
	isActiveSubscription,
	isBuildTargetWeb,
	isDeepEqual,
	isObjectEmpty,
	setBrowserCookieItem,
	setExtensionStorageItem,
	setLocalCookieItem,
	setLocalStorageItem,
} from "../utils";

const DEBOUNCE_TIME = 1;
const MAX_DEBOUNCE_TIME = 10;

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
	const { setSubscriptionSummary, signUpUser } = useAuthActions();
	const { setAxiosAuthHeader, setAxiosBaseURL, setAxiosIntercept } = useAxios();
	const {
		storageUserCustomization,
		setStorageUserCustomization,
		widgetManager,
		showApps,
		showMainView,
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();
	const userCustomizationRef = useRef(storageUserCustomization);
	const isTokenFromCookie = useRef(false);

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

	useEffect(() => {
		(async () => {})();
	}, [storageUserCustomization]);

	// Initializes storageAuth and storageUserCustomization
	useEffect(() => {
		(async () => {
			let auth = await getStorageItem(AUTH);
			let userCustomization = await getStorageItem(CUSTOMIZATION);

			if (isObjectEmpty(auth)) auth = DEFAULT_AUTHENTICATION;
			if (isObjectEmpty(userCustomization))
				userCustomization = DEFAULT_CUSTOMIZATION;

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
			if (bookmarksVisible)
				userCustomization = {
					...userCustomization,
					bookmarks: await getBookmarks(),
					topSites: includeMostVisited
						? await getTopSites()
						: userCustomization.topSites,
				};

			setStorageAuth(auth);
			setStorageUserCustomization(userCustomization);
			setWidgetReady({ widget: STORAGE, type: "data" });
		})();
	}, []);

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
			const localStorageUserCustomization = await getStorageItem(CUSTOMIZATION);
			if (
				isDeepEqual(storageUserCustomization, localStorageUserCustomization) ===
				false
			) {
				await setStorageItem(CUSTOMIZATION, storageUserCustomization);
			}
		})();
	}, [storageUserCustomization]);

	// storageChangeListener for web
	useEffect(() => {
		(async () => {
			if (isBuildTargetWeb === false) return;

			const storageChangeHandler = (event) => {
				const { key, newValue } = event;
				if ([AUTH, CUSTOMIZATION].includes(key)) {
					const parsedValue = JSON.parse(newValue);
					if (key === AUTH) {
						setStorageAuth(parsedValue);
					} else if (key === CUSTOMIZATION) {
						setStorageUserCustomization(parsedValue);
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
					if ([AUTH, CUSTOMIZATION].includes(key)) {
						if (key === AUTH) {
							setStorageAuth(newValue);
						} else if (key === CUSTOMIZATION) {
							if (
								isDeepEqual(userCustomizationRef.current, newValue) === false
							) {
								setStorageUserCustomization(newValue);
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

	// Duplicate storageUserCustomization to access in extension storageChangeHandler
	useEffect(() => {
		(async () => {
			if (isBuildTargetWeb) return;
			userCustomizationRef.current = storageUserCustomization;
		})();
	}, [storageUserCustomization]);

	// Updates Authorization, cookie and review subscriptionSummary onChange token
	useEffect(() => {
		(async () => {
			if (isObjectEmpty(storageAuth)) return;

			setAxiosAuthHeader(storageAuth.token);
			setCookieItem(TOKEN, storageAuth?.token ? storageAuth.token : "");

			let decodedPayload;
			try {
				decodedPayload = jwt_decode(storageAuth.token);
			} catch (error) {
				decodedPayload = { subscriptionSummary: {} };
			}
			const { subscriptionSummary } = decodedPayload;
			const subscriptionPlanFromStorage = storageAuth.subscriptionSummary.plan;
			const subscriptionPlanFromToken = subscriptionSummary.plan;
			const isActiveSubscriptionFromToken =
				isActiveSubscription(subscriptionSummary);
			if (subscriptionPlanFromStorage) {
				if (isActiveSubscriptionFromToken === false) {
					setSubscriptionSummary({ plan: null });
				}
			} else if (subscriptionPlanFromToken && isActiveSubscriptionFromToken) {
				setSubscriptionSummary(subscriptionSummary);
			}
		})();
	}, [storageAuth.token]);
};

// TODO: Hotkey for toggling bookmars
