import { useEffect } from "react";
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
				await setLocalStorageItem(AUTH, JSON.stringify(storageAuth));
				await setLocalStorageItem(
					CUSTOMIZATION,
					JSON.stringify(storageUserCustomization),
				);
			}
		})();
	}, [storageAuth, storageUserCustomization]);
};

// TODO: Hotkey for toggling bookmars
