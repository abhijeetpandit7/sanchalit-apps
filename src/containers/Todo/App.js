import React, { memo } from "react";
import { HeaderControls, Navbar, ViewContainer } from "../Todo";
import { useUserActions, useUserCustomization } from "../../hooks";
import {
	TODO_LIST_TODAY_ID,
	SETTINGS_NAV_LIST,
	processTodoLists,
	processTodos,
} from "../../utils";

const ContextMemo = memo((props) => {
	const {
		activeTodoListId,
		todoLists,
		todos,
		setActiveTodoListId,
		setSettingsActiveNav,
	} = props;

	const processedTodoLists = processTodoLists(todoLists);

	const activeTodoList =
		processedTodoLists.find(({ id }) => id === activeTodoListId) ||
		processedTodoLists.find(({ id }) => id === TODO_LIST_TODAY_ID);

	const processedTodos = processTodos(todos, activeTodoList.id);

	const toggleSettingsTodo = async () => {
		await setSettingsActiveNav(SETTINGS_NAV_LIST[1].value);
		await setSettingsActiveNav(null);
	};

	return (
		<div className="app todo-app calculates-own-max-height">
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
					processedTodoLists,
					processedTodos,
					todos,
					activeTodoList,
					setActiveTodoListId,
				}}
			>
				<HeaderControls
					{...{ processedTodos, activeTodoList, toggleSettingsTodo }}
				/>
			</Navbar>
			<ViewContainer
				{...{ activeTodoList, processedTodos, todos, setActiveTodoListId }}
			/>
		</div>
	);
});

const App = () => {
	const {
		storageUserCustomization: {
			todoLists,
			todos,
			todoSettings: { activeTodoListId },
		},
	} = useUserCustomization();
	const {
		setActiveTodoListId,
		setSettingsActiveNav,
	} = useUserActions();

	return (
		<ContextMemo
			{...{
				activeTodoListId,
				todoLists,
				todos,
				setActiveTodoListId,
				setSettingsActiveNav,
			}}
		/>
	);
};

export default App;
