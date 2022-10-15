import { useCallback } from "react";
import { useUserCustomization } from "../hooks";
import {
	BOOKMARKS,
	BOOKMARKS_PERMISSION,
	EDITING,
	EMPTY_NAME,
	GENERAL_SETTING_APP_LIST,
	INPUT_WRAPPER,
	NOTE_DELETE_TIMEOUT,
	PULSE,
	SEARCH,
	SHOW_TOP_SITES,
	START_IN_TOP_SITES,
	TOP_SITES,
	TOP_SITES_PERMISSION,
	isBuildTargetWeb,
	createNote,
	focusDisplayName,
	focusNotesInput,
	getBookmarks,
	getDaysDifference,
	getPermissionAllowed,
	getTopSites,
	removeRefClassName,
	requestPermissions,
	toggleRefClassName,
	toDays,
} from "../utils";

export const useUserActions = () => {
	const {
		displayNameRef,
		notesInputRef,
		searchInputRef,
		storageUserCustomization,
		setStorageUserCustomization,
		widgetDispatch,
	} = useUserCustomization();

	const cleanupNotes = useCallback(
		() =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				notes: prevCustomization.notes.filter(
					({ deleted, empty, updatedDate }) =>
						empty !== true &&
						(deleted === false ||
							getDaysDifference(updatedDate) > -toDays(NOTE_DELETE_TIMEOUT)),
				),
			})),
		[],
	);

	const createNoteFromEmptyState = useCallback(async () => {
		const newNote = createNote();
		await setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			notes: [...prevCustomization.notes, newNote],
		}));
		await setCurrentNoteId(newNote.id);
		focusNotesInput(notesInputRef);
	}, []);

	const deleteNote = useCallback(
		(taegetNote) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				notes: prevCustomization.notes.map((note) =>
					note.id === taegetNote.id ? { ...note, deleted: true } : note,
				),
			})),
		[],
	);

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

	const saveNote = useCallback((event, activeNote) => {
		const body = event.target.value;
		setStorageUserCustomization((prevCustomization) => {
			const targetNote = prevCustomization.notes.find(
				(note) => note.id === activeNote.id,
			);
			targetNote.body = body;
			targetNote.updatedDate = new Date().getTime();
			delete targetNote["empty"];

			return {
				...prevCustomization,
				notes: prevCustomization.notes.map((note) =>
					note.id === activeNote.id ? targetNote : note,
				),
			};
		});
	}, []);

	const setCurrentNoteId = useCallback(
		(id) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				currentNoteId: id,
			})),
		[],
	);

	const selectBookmarksSetting = useCallback(
		(setting) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				bookmarksSettings: {
					...prevCustomization.bookmarksSettings,
					[setting.keyValue]: setting.newValue,
				},
			})),
		[storageUserCustomization.bookmarksSettings],
	);

	const selectGeneralSetting = useCallback(
		(setting) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				[setting.keyValue]: setting.newValue,
			})),
		[],
	);

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

	const toggleBookmarksSetting = useCallback(
		(setting) => {
			if (setting.requirePermission) {
				if (isBuildTargetWeb) {
					alert("This feature is available only on extension.");
					return;
				} else {
					switch (setting.name) {
						case START_IN_TOP_SITES:
							return toggleTopSitesSetting(setting);

						case SHOW_TOP_SITES:
							return toggleTopSitesSetting(setting);

						default:
							return;
					}
				}
			} else
				setStorageUserCustomization((prevCustomization) => ({
					...prevCustomization,
					bookmarksSettings: {
						...prevCustomization.bookmarksSettings,
						[setting.key]: !prevCustomization.bookmarksSettings[setting.key],
					},
				}));
		},
		[storageUserCustomization.bookmarksSettings],
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

	const toggleShowApp = useCallback(
		async (app) => {
			if (app.requirePermission) {
				if (isBuildTargetWeb) {
					alert("This feature is available only on extension.");
					return;
				} else {
					switch (app.name) {
						case BOOKMARKS:
							return toggleShowBookmarksApp(app);

						case TOP_SITES:
							const {
								bookmarksVisible,
								bookmarksSettings: { defaultMostVisited },
							} = storageUserCustomization;
							const toggleResponse = await toggleTopSitesSetting(app);
							if (
								toggleResponse !== false &&
								defaultMostVisited === false &&
								bookmarksVisible === false
							)
								toggleShowApp(
									GENERAL_SETTING_APP_LIST.find(
										(app) => app.name === BOOKMARKS,
									),
								);
							return;

						default:
							return;
					}
				}
			} else
				setStorageUserCustomization((prevCustomization) => ({
					...prevCustomization,
					[app.key]: !prevCustomization[app.key],
				}));
		},
		[
			storageUserCustomization.bookmarksVisible,
			storageUserCustomization.bookmarksSettings,
		],
	);

	const toggleShowBookmarksApp = useCallback(
		async (app) => {
			const isPermissionAllowed = await getPermissionAllowed(
				BOOKMARKS_PERMISSION,
			);
			if (isPermissionAllowed === false) {
				const isPermissionGranted = await requestPermissions([
					BOOKMARKS_PERMISSION,
				]);
				if (isPermissionGranted === false) return;
			}
			const { bookmarks } = storageUserCustomization;
			let fetchedBookmarks;
			if (bookmarks.length === 0) fetchedBookmarks = await getBookmarks();

			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				[app.key]: !prevCustomization[app.key],
				bookmarks: fetchedBookmarks || prevCustomization.bookmarks,
			}));
		},
		[storageUserCustomization.bookmarks],
	);

	const toggleTopSitesSetting = useCallback(
		async (setting) => {
			const isPermissionAllowed = await getPermissionAllowed(
				TOP_SITES_PERMISSION,
			);
			if (isPermissionAllowed === false) {
				const isPermissionGranted = await requestPermissions([
					TOP_SITES_PERMISSION,
					BOOKMARKS_PERMISSION,
				]);
				if (isPermissionGranted === false) return false;
			}
			const { topSites } = storageUserCustomization;
			let fetchedTopSites;
			if (topSites.length === 0) fetchedTopSites = await getTopSites();

			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				topSites: fetchedTopSites || prevCustomization.topSites,
				bookmarksSettings: {
					...prevCustomization.bookmarksSettings,
					[setting.key]: !prevCustomization.bookmarksSettings[setting.key],
				},
			}));
		},
		[
			storageUserCustomization.topSites,
			storageUserCustomization.bookmarksSettings,
		],
	);

	return {
		cleanupNotes,
		createNoteFromEmptyState,
		deleteNote,
		editDisplayName,
		saveNote,
		selectBookmarksSetting,
		selectGeneralSetting,
		setCurrentNoteId,
		setSearchProvider,
		setWidgetReady,
		toggleBookmarksSetting,
		toggleDisplayNameVisible,
		toggleHour12Clock,
		toggleSearchInCenter,
		toggleShowApp,
	};
};
