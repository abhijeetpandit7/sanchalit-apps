import React from "react";
import {
	TODO_LIST_TODAY_ID,
	TODO_LIST_DONE_ID,
	clearTasksIcon,
	moveToTodayIcon,
} from "../../../../utils";

const Dropdown = ({
	processedTodos,
	activeTodoList,
	toggleHeaderControl,
	toggleSettingsTodo,
}) => {
	const { id: activeTodoListId } = activeTodoList;
	const isAnyTodo = processedTodos.length > 0;
	const isAnyCompletedTodo = processedTodos.some((todo) => todo.isCompleted);

	const isNeitherTodayNorDoneListAndIsAnyTodo =
		[TODO_LIST_TODAY_ID, TODO_LIST_DONE_ID].includes(activeTodoListId) ===
			false && isAnyTodo;

	const isTodayListAndIsAnyTodo =
		activeTodoListId === TODO_LIST_TODAY_ID && isAnyTodo;

	const isNotDoneListAndIsAnyCompletedTodo =
		activeTodoListId !== TODO_LIST_DONE_ID && isAnyCompletedTodo;

	return (
		<div className="dropdown todo-actions-dropdown">
			<ul className="dropdown-list">
				{isNeitherTodayNorDoneListAndIsAnyTodo && (
					<li
						className="dropdown-list-item"
						title="Move all tasks from this list to Today"
					>
						<span className="dropdown-list-icon-wrapper">
							{moveToTodayIcon}
						</span>
						<span className="dropdown-list-label">Send tasks to Today</span>
					</li>
				)}
				{isTodayListAndIsAnyTodo && (
					<li
						className="dropdown-list-item"
						title="Send tasks to Inbox/original lists"
					>
						<span className="dropdown-list-icon-wrapper">{clearTasksIcon}</span>
						<span className="dropdown-list-label">Clear the day</span>
					</li>
				)}
				{isNotDoneListAndIsAnyCompletedTodo && (
					<li className="dropdown-list-item">
						<span className="dropdown-list-icon-wrapper">{clearTasksIcon}</span>
						<span className="dropdown-list-label">Clear completed tasks</span>
					</li>
				)}
				{(isNeitherTodayNorDoneListAndIsAnyTodo ||
					isTodayListAndIsAnyTodo ||
					isNotDoneListAndIsAnyCompletedTodo) && (
					<li className="dropdown-list-item line">
						<span className="dropdown-list-label"></span>
					</li>
				)}
				<li
					className="dropdown-list-item no-icon"
					onClick={() => {
						toggleSettingsTodo();
						toggleHeaderControl();
					}}
				>
					<span className="dropdown-list-label">Settings</span>
				</li>
			</ul>
		</div>
	);
};

export default Dropdown;
