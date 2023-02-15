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
	TODO_LIST_DONE_ID,
	TODO_LIST_TODAY_ID,
	isBuildTargetWeb,
	createCountdown,
	createNote,
	createTodo,
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

	const createNewCountdown = useCallback((name, date, showTime, pinned) => {
		let newCountdown = createCountdown();
		newCountdown = {
			...newCountdown,
			dueDate: date,
			hasHours: showTime,
			name,
			pinned,
		};

		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			countdowns: [...prevCustomization.countdowns, newCountdown],
		}));
	}, []);

	const createNoteFromEmptyState = useCallback(async () => {
		const newNote = createNote();
		await setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			notes: [...prevCustomization.notes, newNote],
		}));
		await setCurrentNoteId(newNote.id);
		focusNotesInput(notesInputRef);
	}, []);

	const createTodoItem = useCallback(
		(title, activeTodoListId) => {
			let newTodo = createTodo();
			const instantDate = new Date();
			const isActiveTodoListDoneList = activeTodoListId === TODO_LIST_DONE_ID;

			const { todos } = storageUserCustomization;
			let lastOrderTodoInList;
			try {
				lastOrderTodoInList = todos
					.filter((todo) => todo.listId === activeTodoListId)
					.reduce((prev, current) =>
						prev.order > current.order ? prev : current,
					);
			} catch (error) {}

			newTodo = {
				...newTodo,
				title,
				completedDate: isActiveTodoListDoneList ? instantDate : null,
				homeListId: activeTodoListId,
				listId: activeTodoListId,
				order: lastOrderTodoInList?.order + 1 || 0,
				done: isActiveTodoListDoneList,
				today: activeTodoListId === TODO_LIST_TODAY_ID,
			};

			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				todos: [...prevCustomization.todos, newTodo],
				todoSettings: {
					...prevCustomization.todoSettings,
					todosUpdatedDate: instantDate,
				},
			}));
		},
		[storageUserCustomization.todos],
	);

	const deleteCountdown = useCallback(
		(targetCountdownId) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				countdowns: prevCustomization.countdowns.filter(
					(countdown) => countdown.id !== targetCountdownId,
				),
			})),
		[],
	);

	const deleteNote = useCallback(
		(targetNote) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				notes: prevCustomization.notes.map((note) =>
					note.id === targetNote.id
						? { ...note, deleted: true, updatedDate: new Date().getTime() }
						: note,
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

	const restoreNote = useCallback((targetNote) => {
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			notes: prevCustomization.notes.map((note) =>
				note.id === targetNote.id
					? { ...note, deleted: false, updatedDate: new Date().getTime() }
					: note,
			),
		}));
	}, []);

	const saveCountdown = useCallback((id, name, date, showTime, pinned) => {
		setStorageUserCustomization((prevCustomization) => {
			const targetCountdown = prevCustomization.countdowns.find(
				(countdown) => countdown.id === id,
			);
			targetCountdown.dueDate = date;
			targetCountdown.hasHours = showTime;
			targetCountdown.name = name;
			targetCountdown.pinned = pinned;
			targetCountdown.updatedDate = new Date().getTime();

			return {
				...prevCustomization,
				countdowns: prevCustomization.countdowns.map((countdown) =>
					countdown.id === id ? targetCountdown : countdown,
				),
			};
		});
	}, []);

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

	const setActiveTodoListId = useCallback(
		(id) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				todoSettings: {
					...prevCustomization.todoSettings,
					activeTodoListId: id,
				},
			})),
		[],
	);

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

	const setCurrentCountdownId = useCallback(
		(id) =>
			widgetDispatch({
				type: "SET_CURRENT_COUNTDOWN_ID",
				payload: { id },
			}),
		[],
	);

	const setDashApp = useCallback(
		(app) =>
			widgetDispatch({
				type: "SET_DASH_APP",
				payload: { app },
			}),
		[],
	);

	const setDashAppStyles = useCallback(
		(styles) =>
			widgetDispatch({
				type: "SET_DASH_APP_STYLES",
				payload: { styles },
			}),
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

	const setSettingsActiveNav = useCallback(
		(value) =>
			widgetDispatch({
				type: "SET_SETTINGS_ACTIVE_NAV",
				payload: { value },
			}),
		[],
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

	const toggleCountdownPin = useCallback(
		(id, pinned) =>
			setStorageUserCustomization((prevCustomization) => {
				let targetCountdown = prevCustomization.countdowns.find(
					(countdown) => countdown.id === id,
				);
				targetCountdown.pinned = !pinned;
				targetCountdown.updatedDate = new Date().getTime();

				return {
					...prevCustomization,
					countdowns: prevCustomization.countdowns.map((countdown) =>
						countdown.id === id ? targetCountdown : countdown,
					),
				};
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

	const toggleRandomMetricCountdown = useCallback(
		() =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				showRandomMetricCountdown: !prevCustomization.showRandomMetricCountdown,
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

	const toggleTodoSetting = useCallback(
		(setting) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				todoSettings: {
					...prevCustomization.todoSettings,
					[setting.key]: !prevCustomization.todoSettings[setting.key],
				},
			})),
		[storageUserCustomization.todoSettings],
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

	const toggleArchiveCountdown = useCallback(
		(targetCountdownId) =>
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				countdowns: prevCustomization.countdowns.map((countdown) =>
					countdown.id === targetCountdownId
						? {
								...countdown,
								archived: !countdown.archived,
								updatedDate: new Date().getTime(),
						  }
						: countdown,
				),
			})),
		[],
	);

	return {
		cleanupNotes,
		createNewCountdown,
		createNoteFromEmptyState,
		createTodoItem,
		deleteCountdown,
		deleteNote,
		editDisplayName,
		restoreNote,
		saveCountdown,
		saveNote,
		selectBookmarksSetting,
		selectGeneralSetting,
		setActiveTodoListId,
		setCurrentNoteId,
		setCurrentCountdownId,
		setDashApp,
		setDashAppStyles,
		setSearchProvider,
		setSettingsActiveNav,
		setWidgetReady,
		toggleArchiveCountdown,
		toggleBookmarksSetting,
		toggleCountdownPin,
		toggleDisplayNameVisible,
		toggleHour12Clock,
		toggleRandomMetricCountdown,
		toggleSearchInCenter,
		toggleShowApp,
		toggleTodoSetting,
	};
};
