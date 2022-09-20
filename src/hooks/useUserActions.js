import { useCallback } from "react";
import { useUserCustomization } from "../hooks";
import {
	BOOKMARKS,
	BOOKMARKS_PERMISSION,
	EDITING,
	EMPTY_NAME,
	GENERAL_SETTING_APP_LIST,
	INPUT_WRAPPER,
	PULSE,
	SEARCH,
	WEB,
	focusDisplayName,
	getBookmarks,
	getPermissionAllowed,
	removeRefClassName,
	requestPermission,
	toggleRefClassName,
} from "../utils";

export const useUserActions = () => {
	const {
		displayNameRef,
		searchInputRef,
		storageUserCustomization,
		setStorageUserCustomization,
		widgetDispatch,
	} = useUserCustomization();

	const editDisplayName = useCallback(async () => {
		const { displayName, displayNameVisible } = storageUserCustomization;
		displayNameVisible === false && (await toggleDisplayNameVisible());

		const element = displayNameRef.current;
		element.setAttribute("contenteditable", true);
		toggleRefClassName(displayNameRef, EDITING);
		toggleRefClassName(displayNameRef, INPUT_WRAPPER);
		toggleRefClassName(displayNameRef, PULSE);
		setTimeout(() => removeRefClassName(displayNameRef, PULSE), 500);
		let isDisplayNameEmpty = false;
		if (!displayName) {
			await setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayName: EMPTY_NAME,
			}));
			isDisplayNameEmpty = true;
		}
		focusDisplayName(displayNameRef);

		element.addEventListener(
			"keypress",
			(event) => event.keyCode === 13 && saveDisplayName(isDisplayNameEmpty),
		);
		element.addEventListener(
			"blur",
			() => saveDisplayName(isDisplayNameEmpty),
			{
				once: true,
			},
		);
	}, [
		storageUserCustomization.displayName,
		storageUserCustomization.displayNameVisible,
	]);

	const saveDisplayName = (isDisplayNameEmpty) => {
		const element = displayNameRef.current;
		element.setAttribute("contenteditable", false);
		removeRefClassName(displayNameRef, EDITING);
		removeRefClassName(displayNameRef, INPUT_WRAPPER);
		toggleRefClassName(displayNameRef, PULSE);
		setTimeout(() => removeRefClassName(displayNameRef, PULSE), 500);

		const newName = element.innerText;
		if (newName)
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayName: newName,
			}));
		else if (isDisplayNameEmpty)
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayName: null,
			}));
		else element.innerText = storageUserCustomization.displayName;
	};

	const setSearchProvider = useCallback(
		(searchProvider) => {
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				searchSettings: {
					...prevCustomization.searchSettings,
					provider: searchProvider,
				},
			}));
			searchInputRef.current.focus();
		},
		[storageUserCustomization.searchSettings],
	);

	const setWidgetReady = useCallback(
		({ widget, type = "app" } = {}) =>
			widgetDispatch({
				type: "SET_READY",
				payload: {
					type: type,
					widget: widget,
				},
			}),
		[],
	);

	const toggleDisplayNameVisible = useCallback(
		() =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				displayNameVisible: !prevCustomization.displayNameVisible,
			})),
		[],
	);

	const toggleHour12Clock = useCallback(
		() =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				hour12clock: !prevCustomization.hour12clock,
			})),
		[],
	);

	const toggleSearchInCenter = useCallback(() => {
		const {
			searchSettings: { inCenter },
			searchVisible,
		} = storageUserCustomization;

		if (inCenter === false && searchVisible === false)
			toggleShowApp(
				GENERAL_SETTING_APP_LIST.find((app) => app.name === SEARCH),
			);
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			searchSettings: {
				...prevCustomization.searchSettings,
				inCenter: !prevCustomization.searchSettings.inCenter,
			},
		}));
	}, [
		storageUserCustomization.searchSettings,
		storageUserCustomization.searchVisible,
	]);

	const toggleShowBookmarksApp = useCallback(
		async (app) => {
			const isPermissionAllowed = await getPermissionAllowed(
				BOOKMARKS_PERMISSION,
			);
			if (isPermissionAllowed === false) {
				const isPermissionGranted = await requestPermission(
					BOOKMARKS_PERMISSION,
				);
				if (isPermissionGranted === false) return;
			}
			const { bookmarks, bookmarksSettings } = storageUserCustomization;
			let fetchedBookmarks;
			if (bookmarks.length === 0)
				fetchedBookmarks = await getBookmarks(bookmarksSettings);

			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				[app.key]: !prevCustomization[app.key],
				bookmarks: fetchedBookmarks || prevCustomization.bookmarks,
			}));
		},
		[storageUserCustomization.bookmarks],
	);

	const toggleShowApp = useCallback((app) => {
		if (app.requirePermission) {
			if (process.env.BUILD_TARGET === WEB) {
				alert("This feature is available only on extension.");
				return;
			} else {
				switch (app.name) {
					case BOOKMARKS: {
						toggleShowBookmarksApp(app);
					}
					default:
						return;
				}
			}
		} else
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				[app.key]: !prevCustomization[app.key],
			}));
	}, []);

	return {
		editDisplayName,
		setSearchProvider,
		setWidgetReady,
		toggleDisplayNameVisible,
		toggleHour12Clock,
		toggleSearchInCenter,
		toggleShowApp,
	};
};
