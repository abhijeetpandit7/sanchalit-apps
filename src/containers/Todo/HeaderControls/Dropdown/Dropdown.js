import React, { useEffect } from "react";
import {
	INBOX,
	TODAY,
	TODO_LIST_DONE_ID,
	TODO_LIST_TODAY_ID,
	clearTasksIcon,
	moveToTodayIcon,
} from "../../../../utils";

const Dropdown = ({
	hasPlus,
	isFocus,
	processedTodos,
	activeTodoList,
	archiveAllDoneTodoItemsFrom,
	moveAllTodoItems,
	moveAllTodoItemsToOriginalList,
	showUpsell,
	toggleHeaderControl,
	toggleSettingsTodo,
	updateAppHeight,
}) => {
	useEffect(() => {
		updateAppHeight();
	}, [isFocus]);

	const { id: activeTodoListId } = activeTodoList;
	const isAnyTodo = processedTodos.length > 0;
	const isAnyCompletedTodo = processedTodos.some((todo) => todo.done);

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
						onClick={() => {
							hasPlus
								? moveAllTodoItems(activeTodoListId, TODO_LIST_TODAY_ID)
								: showUpsell();
							toggleHeaderControl();
						}}
						title={`Move all tasks from this list to ${TODAY}`}
					>
						<span className="dropdown-list-icon-wrapper">
							{moveToTodayIcon}
						</span>
						<span className="dropdown-list-label">Send tasks to {TODAY}</span>
						{hasPlus === false && (
							<span className="badge badge-plus">Plus</span>
						)}
					</li>
				)}
				{isTodayListAndIsAnyTodo && (
					<li
						className="dropdown-list-item"
						onClick={() => {
							hasPlus
								? moveAllTodoItemsToOriginalList(activeTodoListId)
								: showUpsell();
							toggleHeaderControl();
						}}
						title={`Send tasks to ${INBOX}/original lists`}
					>
						<span className="dropdown-list-icon-wrapper">{clearTasksIcon}</span>
						<span className="dropdown-list-label">Clear the day</span>
						{hasPlus === false && (
							<span className="badge badge-plus">Plus</span>
						)}
					</li>
				)}
				{isNotDoneListAndIsAnyCompletedTodo && (
					<li
						className="dropdown-list-item"
						onClick={() => {
							hasPlus
								? archiveAllDoneTodoItemsFrom({
										listId: activeTodoListId,
										onNewDay: false,
									})
								: showUpsell();
							toggleHeaderControl();
						}}
					>
						<span className="dropdown-list-icon-wrapper">{clearTasksIcon}</span>
						<span className="dropdown-list-label">Clear completed tasks</span>
						{hasPlus === false && (
							<span className="badge badge-plus">Plus</span>
						)}
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
