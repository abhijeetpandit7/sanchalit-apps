import { useEffect } from "react";
import { debounce } from "lodash";
import { useAuth, useUserActions, useUserCustomization } from "../hooks";
import {
	API,
	AUTH,
	CUSTOMIZATION,
	DEFAULT_AUTHENTICATION,
	DEFAULT_CUSTOMIZATION,
	getBookmarks,
	getLocalStorageItem,
	getTopSites,
	isObjectEmpty,
	setLocalStorageItem,
} from "../utils";

const DEBOUNCE_TIME = 1;
const MAX_DEBOUNCE_TIME = 10;

export const useAuthPersist = () => {
	const { storageAuth, setStorageAuth } = useAuth();
	const {
		storageUserCustomization,
		setStorageUserCustomization,
		widgetManager,
		showApps,
		showMainView,
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

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

	useEffect(() => {
		(async () => {
			let auth = await JSON.parse(getLocalStorageItem(AUTH));
			let userCustomization = await JSON.parse(
				getLocalStorageItem(CUSTOMIZATION),
			);

			if (isObjectEmpty(auth)) auth = DEFAULT_AUTHENTICATION;
			if (isObjectEmpty(userCustomization))
				userCustomization = DEFAULT_CUSTOMIZATION;

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
			setWidgetReady({ widget: API, type: "data" });
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (
				isObjectEmpty(storageAuth) === false &&
				isObjectEmpty(storageUserCustomization) === false
			) {
				const localStorageAuth = await JSON.parse(getLocalStorageItem(AUTH));
				const localStorageUserCustomization = await JSON.parse(
					getLocalStorageItem(CUSTOMIZATION),
				);
				if (isDeepEqual(storageAuth, localStorageAuth) === false) {
					await setLocalStorageItem(AUTH, JSON.stringify(storageAuth));
				}
				if (
					isDeepEqual(
						storageUserCustomization,
						localStorageUserCustomization,
					) === false
				) {
					await setLocalStorageItem(
						CUSTOMIZATION,
						JSON.stringify(storageUserCustomization),
					);
				}
			}
		})();
	}, [storageAuth, storageUserCustomization]);

	useEffect(() => {
		(async () => {
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
};

// TODO: Hotkey for toggling bookmars
