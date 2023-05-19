import React, { memo, useEffect, useRef } from "react";
import { HeaderControls, Navbar, ViewContainer } from "../Todo";
import { useUserActions, useUserCustomization } from "../../hooks";
import {
	TODO_LIST_TODAY_ID,
	SETTINGS_NAV_LIST,
	processTodoLists,
	processTodos,
	updateTodoAppHeight,
} from "../../utils";

const ContextMemo = memo((props) => {
	const {
		todoInputRef,
		activeTodoListId,
		todoLists,
		todos,
		archiveAllDoneTodoItemsFrom,
		archiveTodoItem,
		createTodoItem,
		createTodoList,
		deleteTodoItem,
		editTodoItemTitle,
		moveAllTodoItems,
		moveAllTodoItemsToOriginalList,
		moveTodoItemTo,
		setActiveTodoListId,
		setSettingsActiveNav,
		setNetworkRequestPayload,
		setTodoItemOrder,
		toggleTodoItemDone,
		validateTodoListsOrder,
		validateTodoListTodoItemsOrder,
	} = props;

	const todoAppRef = useRef(null);

	const processedTodoLists = processTodoLists(todoLists);

	const activeTodoList =
		processedTodoLists.find(({ id }) => id === activeTodoListId) ||
		processedTodoLists.find(({ id }) => id === TODO_LIST_TODAY_ID);

	const processedTodos = processTodos(todos, activeTodoList.id);
	const updateAppHeight = (appHeight) =>
		updateTodoAppHeight(todoAppRef, appHeight);

	useEffect(() => updateAppHeight(), [todos, activeTodoList]);

	useEffect(async () => {
		await archiveAllDoneTodoItemsFrom();
		await validateTodoListTodoItemsOrder();
		validateTodoListsOrder();
	}, []);

	const toggleSettingsTodo = async () => {
		await setSettingsActiveNav(SETTINGS_NAV_LIST[1].value);
		await setSettingsActiveNav(null);
	};

	return (
		<div className="app todo-app calculates-own-max-height" ref={todoAppRef}>
			<div className="drop-zone drop-left-zone">
				<span className="bar left-bar">
					<span className="bar-name"></span>
				</span>
			</div>
			<div className="drop-zone drop-right-zone">
				<span className="bar right-bar">
					<span className="bar-name"></span>
				</span>
			</div>
			<Navbar
				{...{
					todoAppRef,
					processedTodoLists,
					todos,
					activeTodoList,
					createTodoList,
					setActiveTodoListId,
					updateAppHeight,
				}}
			>
				<HeaderControls
					{...{
						processedTodos,
						activeTodoList,
						archiveAllDoneTodoItemsFrom,
						moveAllTodoItems,
						moveAllTodoItemsToOriginalList,
						toggleSettingsTodo,
						updateAppHeight,
					}}
				/>
			</Navbar>
			<ViewContainer
				{...{
					todoAppRef,
					todoInputRef,
					activeTodoList,
					processedTodos,
					processedTodoLists,
					todos,
					archiveTodoItem,
					createTodoItem,
					deleteTodoItem,
					editTodoItemTitle,
					moveTodoItemTo,
					setActiveTodoListId,
					setNetworkRequestPayload,
					setTodoItemOrder,
					toggleTodoItemDone,
					updateAppHeight,
				}}
			/>
		</div>
	);
});

const App = () => {
	const {
		todoInputRef,
		storageUserCustomization: {
			todoLists,
			todos,
			todoSettings: { activeTodoListId },
		},
	} = useUserCustomization();
	const {
		archiveAllDoneTodoItemsFrom,
		archiveTodoItem,
		createTodoItem,
		createTodoList,
		deleteTodoItem,
		editTodoItemTitle,
		moveAllTodoItems,
		moveAllTodoItemsToOriginalList,
		moveTodoItemTo,
		setActiveTodoListId,
		setSettingsActiveNav,
		setNetworkRequestPayload,
		setTodoItemOrder,
		toggleTodoItemDone,
		validateTodoListsOrder,
		validateTodoListTodoItemsOrder,
	} = useUserActions();

	return (
		<ContextMemo
			{...{
				activeTodoListId,
				todoInputRef,
				todoLists,
				todos,
				archiveAllDoneTodoItemsFrom,
				archiveTodoItem,
				createTodoItem,
				createTodoList,
				deleteTodoItem,
				editTodoItemTitle,
				moveAllTodoItems,
				moveAllTodoItemsToOriginalList,
				moveTodoItemTo,
				setActiveTodoListId,
				setSettingsActiveNav,
				setNetworkRequestPayload,
				setTodoItemOrder,
				toggleTodoItemDone,
				validateTodoListsOrder,
				validateTodoListTodoItemsOrder,
			}}
		/>
	);
};

export default App;
