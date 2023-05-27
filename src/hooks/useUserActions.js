import { useCallback } from "react";
import _ from "lodash";
import { useAuthActions, useUserCustomization } from "../hooks";
import {
	BOOKMARKS,
	BOOKMARKS_PERMISSION,
	DATE_ROLLOVER_HOUR,
	EDITING,
	EMPTY_NAME,
	FIREFOX,
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
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
	isBuildTargetWeb,
	TODO_SHOW_SETTING,
	createCountdown,
	createNote,
	createTodo,
	createNewTodoList,
	focusCursorAtEnd,
	focusDisplayName,
	focusNotesInput,
	getBookmarks,
	getBrowserType,
	getDaysDifference,
	getNewOrderValue,
	getPermissionAllowed,
	getTopSites,
	isValidListOrder,
	removeRefClassName,
	requestPermissions,
	toggleRefClassName,
	toDays,
} from "../utils";

export const useUserActions = () => {
	const { deleteUserData } = useAuthActions();
	const {
		displayNameRef,
		notesInputRef,
		searchInputRef,
		storageUserCustomization,
		setStorageUserCustomization,
		networkRequestDispatch,
		widgetDispatch,
	} = useUserCustomization();

	const archiveAllDoneTodoItemsFrom = useCallback(
		async ({ listId = false, onNewDay = true } = {}) => {
			let updatedItems = [];
			await storageUserCustomization.todos
				.filter((todo) =>
					listId ? todo.listId === listId : todo.listId !== TODO_LIST_DONE_ID,
				)
				.filter((todo) => todo.done)
				.filter((todo) => {
					if (onNewDay) {
						const today = new Date();
						today.setHours(DATE_ROLLOVER_HOUR, 0, 0, 0);
						const todoItemCompletedDate = new Date(todo.completedDate);
						return todoItemCompletedDate.getTime() < today.getTime();
					} else return true;
				})
				.map(async (todo) =>
					updatedItems.push(await archiveTodoItem(todo.id, false)),
				);
			await Promise.all(updatedItems);
			if (updatedItems.length) {
				const updatedObject = {
					todos: updatedItems.map((item) => item.todo),
					todoSettings: _.last(updatedItems).todoSettings,
				};
				setNetworkRequestPayload(updatedObject);
			}
		},
		[storageUserCustomization.todos],
	);

	const archiveTodoItem = useCallback(async (id, postData = true) => {
		let updatedObject;
		await setStorageUserCustomization((prevCustomization) => {
			const instantDate = new Date();
			const targetTodoItem = prevCustomization.todos.find(
				(todo) => todo.id === id,
			);

			targetTodoItem.today = false;
			targetTodoItem.listId = TODO_LIST_DONE_ID;
			targetTodoItem.ts = instantDate.getTime();

			const filteredTargetTodoItem = _.pick(targetTodoItem, [
				"id",
				"today",
				"listId",
				"ts",
			]);
			updatedObject = {
				[postData ? "todos" : "todo"]: postData
					? [filteredTargetTodoItem]
					: filteredTargetTodoItem,
				todoSettings: {
					todosUpdatedDate: instantDate.toISOString(),
				},
			};
			if (postData) setNetworkRequestPayload(updatedObject);

			return {
				...prevCustomization,
				todos: prevCustomization.todos.map((todo) =>
					todo.id === id ? targetTodoItem : todo,
				),
				todoSettings: {
					...prevCustomization.todoSettings,
					...updatedObject.todoSettings,
				},
			};
		});
		return updatedObject;
	}, []);

	const cleanupNotes = useCallback(
		() =>
			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = {
					notes: _.cloneDeep(prevCustomization.notes)
						.filter(
							({ deleted, empty, updatedDate }) =>
								empty === true ||
								(deleted === true &&
									getDaysDifference(updatedDate) <=
										-toDays(NOTE_DELETE_TIMEOUT)),
						)
						.map((note) => _.pick(note, ["id"])),
				};
				if (updatedObject.notes.length) deleteUserData("/note", updatedObject);
				return {
					...prevCustomization,
					notes: prevCustomization.notes.filter(
						(note) =>
							updatedObject.notes
								.map((deletedNote) => deletedNote.id)
								.includes(note.id) === false,
					),
				};
			}),
		[],
	);

	const createNewCountdown = useCallback((name, date, showTime, pinned) => {
		let newCountdown = createCountdown();
		newCountdown = {
			...newCountdown,
			dueDate: date.toISOString(),
			hasHours: showTime,
			name,
			pinned,
		};

		const updatedObject = { countdowns: [newCountdown] };
		setNetworkRequestPayload(updatedObject);

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
		(title, activeTodoListId, isTopOrder) => {
			let newTodo = createTodo();
			const instantDate = new Date();
			const isActiveTodoListDoneList = activeTodoListId === TODO_LIST_DONE_ID;

			const { todos } = storageUserCustomization;
			const newOrder = isTopOrder
				? 0
				: getNewOrderValue(todos, activeTodoListId);

			newTodo = {
				...newTodo,
				title,
				completedDate: isActiveTodoListDoneList
					? instantDate.toISOString()
					: null,
				homeListId: activeTodoListId,
				listId: activeTodoListId,
				order: newOrder,
				done: isActiveTodoListDoneList,
				today: activeTodoListId === TODO_LIST_TODAY_ID,
			};
			const updatedObject = {
				todos: [newTodo],
				todoSettings: {
					todosUpdatedDate: instantDate.toISOString(),
				},
			};
			setNetworkRequestPayload(updatedObject);
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				todos: [...prevCustomization.todos, newTodo],
				todoSettings: {
					...prevCustomization.todoSettings,
					...updatedObject.todoSettings,
				},
			}));
		},
		[storageUserCustomization.todos],
	);

	const createTodoList = useCallback(
		(title) => {
			let newTodoList = createNewTodoList();
			const { todoLists } = storageUserCustomization;
			const newOrder = getNewOrderValue(todoLists);

			newTodoList = {
				...newTodoList,
				title,
				order: newOrder,
			};
			const updatedObject = {
				todoLists: [newTodoList],
				todoSettings: {
					todosUpdatedDate: new Date().toISOString(),
				},
			};
			setNetworkRequestPayload(updatedObject);
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				todoLists: [...prevCustomization.todoLists, newTodoList],
				todoSettings: {
					...prevCustomization.todoSettings,
					activeTodoListId: newTodoList.id,
					...updatedObject.todoSettings,
				},
			}));
		},
		[storageUserCustomization.todoLists],
	);

	const deleteCountdown = useCallback((targetCountdownId) => {
		deleteUserData(`/countdown/${targetCountdownId}`);
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			countdowns: prevCustomization.countdowns.filter(
				(countdown) => countdown.id !== targetCountdownId,
			),
		}));
	}, []);

	const deleteNote = useCallback((targetNote) => {
		const updatedObject = {
			notes: [
				{
					id: targetNote.id,
					deleted: true,
					updatedDate: new Date().getTime(),
				},
			],
		};
		setNetworkRequestPayload(updatedObject);
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			notes: prevCustomization.notes.map((note) =>
				note.id === targetNote.id
					? { ...note, ...updatedObject.notes[0] }
					: note,
			),
		}));
	}, []);

	const deleteTodoItem = useCallback((id) => {
		const updatedObject = {
			todoSettings: {
				todosUpdatedDate: new Date().toISOString(),
			},
		};
		deleteUserData(`/todo/${id}`, updatedObject);
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			todos: prevCustomization.todos.filter((todo) => todo.id !== id),
			todoSettings: {
				...prevCustomization.todoSettings,
				...updatedObject.todoSettings,
			},
		}));
	}, []);

	const deleteTodoList = useCallback((id) => {
		const updatedObject = {
			todoSettings: {
				todosUpdatedDate: new Date().toISOString(),
			},
		};
		deleteUserData(`/todoList/${id}`, updatedObject);
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			todoLists: prevCustomization.todoLists.filter(
				(todoList) => todoList.id !== id,
			),
			todoSettings: {
				...prevCustomization.todoSettings,
				...updatedObject.todoSettings,
			},
		}));
	}, []);

	const editDisplayName = useCallback(async () => {
		const { displayName, displayNameVisible } = storageUserCustomization;
		displayNameVisible === false && (await toggleDisplayNameVisible());

		const element = displayNameRef.current;
		if (element.getAttribute("contenteditable") === "true") return;
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

	const editTodoItemTitle = useCallback(
		(event, id) => {
			const element = event.target
				.closest(".todo-item")
				.querySelector(".todo-item-title");
			if (element.getAttribute("contenteditable") === "true") return;
			element.setAttribute("contenteditable", true);
			focusCursorAtEnd(element);

			element.addEventListener(
				"keypress",
				(event) => event.keyCode === 13 && saveTodoItemTitle(event, id),
			);
			element.addEventListener("blur", () => saveTodoItemTitle(event, id), {
				once: true,
			});
		},
		[storageUserCustomization.todos],
	);

	const editTodoListTitle = useCallback(
		(event, id) => {
			event.stopPropagation();
			const element = event.target
				.closest(".settings-todo-list")
				.querySelector(".settings-todo-list-name");
			if (element.getAttribute("contenteditable") === "true") return;
			element.setAttribute("contenteditable", true);
			element.classList.add(EDITING);
			focusCursorAtEnd(element);

			element.addEventListener(
				"keypress",
				(event) => event.keyCode === 13 && saveTodoListTitle(element, id),
			);
			element.addEventListener("blur", () => saveTodoListTitle(element, id), {
				once: true,
			});
		},
		[storageUserCustomization.todoLists],
	);

	const getTodoListItemsCount = useCallback(
		(id) =>
			storageUserCustomization.todos.filter((todo) => todo.listId === id)
				.length,
		[storageUserCustomization.todos],
	);

	const hideTodoApp = useCallback(() => {
		const {
			todoVisible,
			todoSettings: { keepTodoState, showTodoList },
		} = storageUserCustomization;

		if (todoVisible && keepTodoState && showTodoList)
			toggleTodoSetting(TODO_SHOW_SETTING);
	}, [
		storageUserCustomization.todoVisible,
		storageUserCustomization.todoSettings,
	]);

	const moveAllTodoItems = useCallback(
		async (fromListId, toListId) => {
			let updatedItems = [];
			await storageUserCustomization.todos
				.filter((todo) => todo.listId === fromListId)
				.map(async (todo) =>
					updatedItems.push(
						await moveTodoItemTo(todo.id, toListId, null, false),
					),
				);
			await Promise.all(updatedItems);
			if (updatedItems.length) {
				const updatedObject = {
					todos: updatedItems.map((item) => item.todo),
					todoSettings: _.last(updatedItems).todoSettings,
				};
				setNetworkRequestPayload(updatedObject);
			}
		},
		[storageUserCustomization.todos],
	);

	const moveAllTodoItemsToOriginalList = useCallback(
		async (fromListId) => {
			let updatedItems = [];
			await storageUserCustomization.todos
				.filter((todo) => todo.listId === fromListId)
				.map(async (todo) =>
					updatedItems.push(
						await moveTodoItemTo(
							todo.id,
							todo.homeListId === TODO_LIST_TODAY_ID
								? TODO_LIST_INBOX_ID
								: todo.homeListId,
							null,
							false,
						),
					),
				);
			await Promise.all(updatedItems);
			if (updatedItems.length) {
				const updatedObject = {
					todos: updatedItems.map((item) => item.todo),
					todoSettings: _.last(updatedItems).todoSettings,
				};
				setNetworkRequestPayload(updatedObject);
			}
		},
		[storageUserCustomization.todos],
	);

	const moveTodoItemTo = useCallback(
		async (itemId, listId, fromDoneList, postData = true) => {
			let updatedObject;
			await setStorageUserCustomization((prevCustomization) => {
				const instantDate = new Date();
				const targetTodoItem = prevCustomization.todos.find(
					(todo) => todo.id === itemId,
				);
				const isTargetTodoItemListDoneList =
					fromDoneList || targetTodoItem.listId === TODO_LIST_DONE_ID;
				const targetTodoList = prevCustomization.todoLists.find(
					(todoList) => todoList.id === listId,
				);

				const isTargetDoneList = listId === TODO_LIST_DONE_ID;
				const isTargetTodayList = listId === TODO_LIST_TODAY_ID;

				targetTodoItem.today = false;
				if (isTargetTodoItemListDoneList) {
					targetTodoItem.completedDate = null;
					targetTodoItem.done = false;
				}
				if (isTargetDoneList) {
					if (targetTodoItem.done === false)
						targetTodoItem.completedDate = instantDate.toISOString();
					targetTodoItem.done = true;
				} else if (isTargetTodayList) {
					targetTodoItem.today = true;
				}

				if (targetTodoList) {
					targetTodoItem.listId = listId;
				} else {
					targetTodoItem.homeListId = TODO_LIST_INBOX_ID;
					targetTodoItem.listId = TODO_LIST_INBOX_ID;
				}
				if (isTargetDoneList === false) {
					targetTodoItem.order = getNewOrderValue(
						prevCustomization.todos,
						targetTodoItem.listId,
					);
				}
				targetTodoItem.ts = instantDate.getTime();

				const filteredTargetTodoItem = _.omit(targetTodoItem, [
					"title",
					"createdDate",
					"viewSectionId",
				]);
				updatedObject = {
					[postData ? "todos" : "todo"]: postData
						? [filteredTargetTodoItem]
						: filteredTargetTodoItem,
					todoSettings: {
						todosUpdatedDate: instantDate.toISOString(),
					},
				};
				if (postData) setNetworkRequestPayload(updatedObject);

				return {
					...prevCustomization,
					todos: prevCustomization.todos.map((todo) =>
						todo.id === itemId ? targetTodoItem : todo,
					),
					todoSettings: {
						...prevCustomization.todoSettings,
						...updatedObject.todoSettings,
					},
				};
			});
			return updatedObject;
		},
		[],
	);

	const reorderAllTodoItems = useCallback(async (todoItems) => {
		let updatedItems = [];
		await todoItems
			.sort((a, b) => a.order - b.order)
			.map(async (todoItem, index) => {
				if (todoItem.order !== index)
					updatedItems.push(await setTodoItemOrder(todoItem.id, index));
			});
		await Promise.all(updatedItems);
		if (updatedItems.length) {
			const updatedObject = {
				todos: updatedItems.map((item) => item.todo),
				todoSettings: _.last(updatedItems).todoSettings,
			};
			setNetworkRequestPayload(updatedObject);
		}
	}, []);

	const reorderAllTodoLists = useCallback(async (todoLists) => {
		let updatedItems = [];
		await todoLists
			.sort((a, b) => a.order - b.order)
			.map(async (todoList, index) => {
				if (todoList.order !== index)
					updatedItems.push(await setTodoListOrder(todoList.id, index));
			});
		await Promise.all(updatedItems);
		if (updatedItems.length) {
			const updatedObject = {
				todoLists: updatedItems.map((item) => item.todoList),
				todoSettings: _.last(updatedItems).todoSettings,
			};
			setNetworkRequestPayload(updatedObject);
		}
	}, []);

	const restoreNote = useCallback((targetNote) => {
		const updatedObject = {
			notes: [
				{
					id: targetNote.id,
					deleted: false,
					updatedDate: new Date().getTime(),
				},
			],
		};
		setNetworkRequestPayload(updatedObject);
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			notes: prevCustomization.notes.map((note) =>
				note.id === targetNote.id
					? { ...note, ...updatedObject.notes[0] }
					: note,
			),
		}));
	}, []);

	const saveCountdown = useCallback((id, name, date, showTime, pinned) => {
		setStorageUserCustomization((prevCustomization) => {
			const targetCountdown = prevCustomization.countdowns.find(
				(countdown) => countdown.id === id,
			);
			targetCountdown.dueDate = date.toISOString();
			targetCountdown.hasHours = showTime;
			targetCountdown.name = name;
			targetCountdown.pinned = pinned;
			targetCountdown.updatedDate = new Date().getTime();

			const updatedObject = { countdowns: [targetCountdown] };
			setNetworkRequestPayload(updatedObject);

			return {
				...prevCustomization,
				countdowns: prevCustomization.countdowns.map((countdown) =>
					countdown.id === id ? targetCountdown : countdown,
				),
			};
		});
	}, []);

	const saveDisplayName = useCallback(
		(isDisplayNameEmpty) => {
			const element = displayNameRef.current;
			element.setAttribute("contenteditable", false);
			removeRefClassName(displayNameRef, EDITING);
			removeRefClassName(displayNameRef, INPUT_WRAPPER);
			toggleRefClassName(displayNameRef, PULSE);
			setTimeout(() => removeRefClassName(displayNameRef, PULSE), 500);

			const newName = element.innerText;
			const oldName = storageUserCustomization.displayName;
			if (newName === oldName) return;
			else if (newName.trim().length)
				setStorageUserCustomization((prevCustomization) => {
					const updatedObject = { displayName: newName.trim() };
					setNetworkRequestPayload(updatedObject);
					return {
						...prevCustomization,
						...updatedObject,
					};
				});
			else if (isDisplayNameEmpty)
				setStorageUserCustomization((prevCustomization) => ({
					...prevCustomization,
					displayName: null,
				}));
			else element.innerText = oldName;
		},
		[storageUserCustomization.displayName],
	);

	const saveTodoItemTitle = useCallback(
		(event, id) => {
			const element = event.target
				.closest(".todo-item")
				.querySelector(".todo-item-title");
			element.setAttribute("contenteditable", false);
			const newTitle = element.innerText;
			const oldTitle = storageUserCustomization.todos.find(
				(todo) => todo.id === id,
			).title;
			if (newTitle === oldTitle) return;
			else if (newTitle.trim().length) {
				const instantDate = new Date();
				const updatedObject = {
					todos: [
						{
							id,
							title: newTitle.trim(),
							ts: instantDate.getTime(),
						},
					],
					todoSettings: {
						todosUpdatedDate: instantDate.toISOString(),
					},
				};
				setNetworkRequestPayload(updatedObject);
				setStorageUserCustomization((prevCustomization) => {
					let targetTodoItem = prevCustomization.todos.find(
						(todo) => todo.id === id,
					);

					targetTodoItem = {
						...targetTodoItem,
						...updatedObject.todos[0],
					};

					return {
						...prevCustomization,
						todos: prevCustomization.todos.map((todo) =>
							todo.id === id ? targetTodoItem : todo,
						),
						todoSettings: {
							...prevCustomization.todoSettings,
							...updatedObject.todoSettings,
						},
					};
				});
			} else element.innerText = oldTitle;
		},
		[storageUserCustomization.todos],
	);

	const saveTodoListTitle = useCallback(
		(element, id) => {
			element.setAttribute("contenteditable", false);
			element.classList.remove(EDITING);
			const newTitle = element.innerText;
			const oldTilte = storageUserCustomization.todoLists.find(
				(todoList) => todoList.id === id,
			).title;

			if (newTitle === oldTilte) return;
			else if (newTitle.trim().length) {
				const instantDate = new Date();
				const updatedObject = {
					todoLists: [
						{
							id,
							title: newTitle,
							ts: instantDate.getTime(),
						},
					],
					todoSettings: {
						todosUpdatedDate: instantDate.toISOString(),
					},
				};
				setNetworkRequestPayload(updatedObject);
				setStorageUserCustomization((prevCustomization) => {
					let targetTodoList = prevCustomization.todoLists.find(
						(todoList) => todoList.id === id,
					);

					targetTodoList = {
						...targetTodoList,
						...updatedObject.todoLists[0],
					};

					return {
						...prevCustomization,
						todoLists: prevCustomization.todoLists.map((todoList) =>
							todoList.id === id ? targetTodoList : todoList,
						),
						todoSettings: {
							...prevCustomization.todoSettings,
							...updatedObject.todoSettings,
						},
					};
				});
			} else element.innerText = oldTilte;
		},
		[storageUserCustomization.todoLists],
	);

	const saveNote = useCallback((event, activeNote) => {
		const body = event.target.value;
		setStorageUserCustomization((prevCustomization) => {
			const targetNote = prevCustomization.notes.find(
				(note) => note.id === activeNote.id,
			);
			targetNote.body = body;
			targetNote.updatedDate = new Date().getTime();
			delete targetNote["empty"];

			let updatedObject = { notes: [targetNote] };
			setNetworkRequestPayload(updatedObject);

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
			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = {
					bookmarksSettings: {
						[setting.keyValue]: setting.newValue,
					},
				};
				setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					bookmarksSettings: {
						...prevCustomization.bookmarksSettings,
						...updatedObject.bookmarksSettings,
					},
				};
			}),
		[storageUserCustomization.bookmarksSettings],
	);

	const selectGeneralSetting = useCallback(
		(setting) =>
			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = { [setting.keyValue]: setting.newValue };
				setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					...updatedObject,
				};
			}),
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

	const setNetworkRequestPayload = useCallback(
		(data) =>
			networkRequestDispatch({
				type: "SET_PAYLOAD",
				payload: { data },
			}),
		[],
	);

	const setSearchProvider = useCallback(
		(searchProvider) => {
			const updatedObject = {
				searchSettings: {
					provider: searchProvider,
				},
			};
			setNetworkRequestPayload(updatedObject);
			setStorageUserCustomization((prevCustomization) => ({
				...prevCustomization,
				searchSettings: {
					...prevCustomization.searchSettings,
					...updatedObject.searchSettings,
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

	const setTodoItemOrder = useCallback(async (id, order) => {
		const instantDate = new Date();
		const updatedObject = {
			todo: {
				id,
				order,
				ts: instantDate.getTime(),
			},
			todoSettings: {
				todosUpdatedDate: instantDate.toISOString(),
			},
		};
		await setStorageUserCustomization((prevCustomization) => {
			let targetTodoItem = prevCustomization.todos.find(
				(todo) => todo.id === id,
			);

			targetTodoItem = {
				...targetTodoItem,
				...updatedObject.todo,
			};

			return {
				...prevCustomization,
				todos: prevCustomization.todos.map((todo) =>
					todo.id === id ? targetTodoItem : todo,
				),
				todoSettings: {
					...prevCustomization.todoSettings,
					...updatedObject.todoSettings,
				},
			};
		});
		return updatedObject;
	}, []);

	const setTodoListOrder = useCallback(async (id, order) => {
		const instantDate = new Date();
		const updatedObject = {
			todoList: {
				id,
				order,
				ts: instantDate.getTime(),
			},
			todoSettings: {
				todosUpdatedDate: instantDate.toISOString(),
			},
		};
		await setStorageUserCustomization((prevCustomization) => {
			let targetTodoList = prevCustomization.todoLists.find(
				(todoList) => todoList.id === id,
			);

			targetTodoList = {
				...targetTodoList,
				...updatedObject.todoList,
			};

			return {
				...prevCustomization,
				todoLists: prevCustomization.todoLists.map((todoList) =>
					todoList.id === id ? targetTodoList : todoList,
				),
				todoSettings: {
					...prevCustomization.todoSettings,
					...updatedObject.todoSettings,
				},
			};
		});
		return updatedObject;
	}, []);

	const setTodoListColour = useCallback((id, colour) => {
		const instantDate = new Date();
		const updatedObject = {
			todoLists: [
				{
					id,
					colour,
					ts: instantDate.getTime(),
				},
			],
			todoSettings: {
				todosUpdatedDate: instantDate.toISOString(),
			},
		};
		setNetworkRequestPayload(updatedObject);
		setStorageUserCustomization((prevCustomization) => {
			let targetTodoList = prevCustomization.todoLists.find(
				(todoList) => todoList.id === id,
			);

			targetTodoList = {
				...targetTodoList,
				...updatedObject.todoLists[0],
			};

			return {
				...prevCustomization,
				todoLists: prevCustomization.todoLists.map((todoList) =>
					todoList.id === id ? targetTodoList : todoList,
				),
				todoSettings: {
					...prevCustomization.todoSettings,
					...updatedObject.todoSettings,
				},
			};
		});
	}, []);

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
				setStorageUserCustomization((prevCustomization) => {
					const updatedObject = {
						bookmarksSettings: {
							[setting.key]: !prevCustomization.bookmarksSettings[setting.key],
						},
					};
					setNetworkRequestPayload(updatedObject);
					return {
						...prevCustomization,
						bookmarksSettings: {
							...prevCustomization.bookmarksSettings,
							[setting.key]: !prevCustomization.bookmarksSettings[setting.key],
						},
					};
				});
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

				const updatedObject = {
					countdowns: [
						_.pick(targetCountdown, ["id", "pinned", "updatedDate"]),
					],
				};
				setNetworkRequestPayload(updatedObject);

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
			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = {
					displayNameVisible: !prevCustomization.displayNameVisible,
				};
				setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					...updatedObject,
				};
			}),
		[],
	);

	const toggleHour12Clock = useCallback(
		() =>
			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = { hour12clock: !prevCustomization.hour12clock };
				setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					...updatedObject,
				};
			}),
		[],
	);

	const toggleRandomMetricCountdown = useCallback(
		() =>
			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = {
					showRandomMetricCountdown:
						!prevCustomization.showRandomMetricCountdown,
				};
				setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					...updatedObject,
				};
			}),
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
		setStorageUserCustomization((prevCustomization) => {
			const updatedObject = {
				searchSettings: {
					inCenter: !prevCustomization.searchSettings.inCenter,
				},
			};
			setNetworkRequestPayload(updatedObject);
			return {
				...prevCustomization,
				searchSettings: {
					...prevCustomization.searchSettings,
					...updatedObject.searchSettings,
				},
			};
		});
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
								toggleShowBookmarksApp(
									GENERAL_SETTING_APP_LIST.find(
										(app) => app.name === BOOKMARKS,
									),
									true,
								);
							return;

						default:
							return;
					}
				}
			} else
				setStorageUserCustomization((prevCustomization) => {
					const updatedObject = { [app.key]: !prevCustomization[app.key] };
					setNetworkRequestPayload(updatedObject);
					return {
						...prevCustomization,
						...updatedObject,
					};
				});
		},
		[
			storageUserCustomization.bookmarksVisible,
			storageUserCustomization.bookmarksSettings,
		],
	);

	const toggleShowBookmarksApp = useCallback(
		async (app, alreadyRequestedPermission) => {
			// Avoid checking permissionAllowed in firefox, to prevent user input handler error
			const isFirefox = getBrowserType().name === FIREFOX;
			const isPermissionAllowed = isFirefox
				? !!alreadyRequestedPermission
				: await getPermissionAllowed(BOOKMARKS_PERMISSION);
			if (isPermissionAllowed === false) {
				const isPermissionGranted = await requestPermissions([
					BOOKMARKS_PERMISSION,
				]);
				if (isPermissionGranted === false) return;
			}
			const { bookmarks } = storageUserCustomization;
			let fetchedBookmarks;
			if (bookmarks.length === 0) fetchedBookmarks = await getBookmarks();

			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = {
					[app.key]: !prevCustomization[app.key],
				};
				setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					...updatedObject,
					bookmarks: fetchedBookmarks || prevCustomization.bookmarks,
				};
			});
		},
		[storageUserCustomization.bookmarks],
	);

	const toggleTodoItemDone = useCallback(
		(id, done) =>
			setStorageUserCustomization((prevCustomization) => {
				const instantDate = new Date();
				const targetTodoItem = prevCustomization.todos.find(
					(todo) => todo.id === id,
				);

				targetTodoItem.done = !done;
				targetTodoItem.completedDate = targetTodoItem.done
					? instantDate.toISOString()
					: null;
				targetTodoItem.ts = instantDate.getTime();

				let updatedObject = {
					todos: [
						_.pick(targetTodoItem, ["id", "done", "completedDate", "ts"]),
					],
					todoSettings: {
						todosUpdatedDate: instantDate.toISOString(),
					},
				};

				if (targetTodoItem.done === false) {
					const targetTodoItemHomeListId = targetTodoItem.homeListId;
					const isTargetTodoItemHomeListDoneList =
						targetTodoItemHomeListId === TODO_LIST_DONE_ID;
					const isTargetTodoItemListDoneList =
						targetTodoItem.listId === TODO_LIST_DONE_ID;

					if (isTargetTodoItemHomeListDoneList)
						targetTodoItem.homeListId = TODO_LIST_INBOX_ID;
					else {
						const ifTargetTodoItemHomeListExists =
							prevCustomization.todoLists.some(
								(todoList) => todoList.id === targetTodoItemHomeListId,
							);
						if (ifTargetTodoItemHomeListExists === false)
							targetTodoItem.homeListId = TODO_LIST_INBOX_ID;
					}
					if (isTargetTodoItemListDoneList) {
						targetTodoItem.listId = targetTodoItem.homeListId;
						targetTodoItem.order = getNewOrderValue(
							prevCustomization.todos,
							targetTodoItem.listId,
						);
					}
					updatedObject.todos = [
						_.omit(targetTodoItem, [
							"title",
							"createdDate",
							"today",
							"viewSectionId",
						]),
					];
				}

				setNetworkRequestPayload(updatedObject);

				return {
					...prevCustomization,
					todos: prevCustomization.todos.map((todo) =>
						todo.id === id ? targetTodoItem : todo,
					),
					todoSettings: {
						...prevCustomization.todoSettings,
						...updatedObject.todoSettings,
					},
				};
			}),
		[],
	);

	const toggleTodoSetting = useCallback(
		(setting) =>
			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = {
					todoSettings: {
						[setting.key]: !prevCustomization.todoSettings[setting.key],
					},
				};
				if (setting.key !== "showTodoList")
					setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					todoSettings: {
						...prevCustomization.todoSettings,
						...updatedObject.todoSettings,
					},
				};
			}),
		[storageUserCustomization.todoSettings],
	);

	const toggleTopSitesSetting = useCallback(
		async (setting) => {
			// Avoid checking permissionAllowed in firefox, to prevent user input handler error
			const isFirefox = getBrowserType().name === FIREFOX;
			const isPermissionAllowed = isFirefox
				? false
				: await getPermissionAllowed(TOP_SITES_PERMISSION);
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

			setStorageUserCustomization((prevCustomization) => {
				const updatedObject = {
					bookmarksSettings: {
						[setting.key]: !prevCustomization.bookmarksSettings[setting.key],
					},
				};
				setNetworkRequestPayload(updatedObject);
				return {
					...prevCustomization,
					topSites: fetchedTopSites || prevCustomization.topSites,
					bookmarksSettings: {
						...prevCustomization.bookmarksSettings,
						...updatedObject.bookmarksSettings,
					},
				};
			});
		},
		[
			storageUserCustomization.topSites,
			storageUserCustomization.bookmarksSettings,
		],
	);

	const toggleArchiveCountdown = useCallback(
		(targetCountdownId) =>
			setStorageUserCustomization((prevCustomization) => {
				let targetCountdown = prevCustomization.countdowns.find(
					(countdown) => countdown.id === targetCountdownId,
				);

				targetCountdown = {
					...targetCountdown,
					archived: !targetCountdown.archived,
					updatedDate: new Date().getTime(),
				};

				const updatedObject = {
					countdowns: [
						_.pick(targetCountdown, ["id", "archived", "updatedDate"]),
					],
				};
				setNetworkRequestPayload(updatedObject);

				return {
					...prevCustomization,
					countdowns: prevCustomization.countdowns.map((countdown) =>
						countdown.id === targetCountdownId ? targetCountdown : countdown,
					),
				};
			}),
		[],
	);

	const validateTodoListsOrder = useCallback(async () => {
		const todoLists = storageUserCustomization.todoLists;
		return isValidListOrder(todoLists)
			? null
			: await reorderAllTodoLists(todoLists);
	}, [storageUserCustomization.todoLists]);

	const validateTodoListTodoItemsOrder = useCallback(
		() =>
			storageUserCustomization.todoLists
				.filter((todoList) => todoList.id !== TODO_LIST_DONE_ID)
				.map(async (todoList) => {
					const todoItems = storageUserCustomization.todos
						.filter((todoItem) => todoItem.listId === todoList.id)
						.sort((a, b) => b.ts - a.ts);
					return isValidListOrder(todoItems)
						? null
						: await reorderAllTodoItems(todoItems);
				}),
		[(storageUserCustomization.todoLists, storageUserCustomization.todos)],
	);

	return {
		archiveAllDoneTodoItemsFrom,
		archiveTodoItem,
		cleanupNotes,
		createNewCountdown,
		createNoteFromEmptyState,
		createTodoItem,
		createTodoList,
		deleteCountdown,
		deleteNote,
		deleteTodoItem,
		deleteTodoList,
		editDisplayName,
		editTodoItemTitle,
		editTodoListTitle,
		getTodoListItemsCount,
		hideTodoApp,
		moveAllTodoItems,
		moveAllTodoItemsToOriginalList,
		moveTodoItemTo,
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
		setNetworkRequestPayload,
		setSearchProvider,
		setSettingsActiveNav,
		setTodoItemOrder,
		setTodoListOrder,
		setTodoListColour,
		setWidgetReady,
		toggleArchiveCountdown,
		toggleBookmarksSetting,
		toggleCountdownPin,
		toggleDisplayNameVisible,
		toggleHour12Clock,
		toggleRandomMetricCountdown,
		toggleSearchInCenter,
		toggleShowApp,
		toggleTodoItemDone,
		toggleTodoSetting,
		validateTodoListsOrder,
		validateTodoListTodoItemsOrder,
	};
};
