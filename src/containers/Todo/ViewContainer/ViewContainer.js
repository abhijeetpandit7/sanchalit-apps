import React from "react";
import {
	INBOX,
	TODAY,
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
} from "../../../utils";

const ADD_A_TODO_TO_GET_STARTED = "Add a todo to get started";
const NO_TODOS_YET = "No todos yet";
const SWITCH_TO_ = "Switch to ";

export const ViewContainer = ({
	activeTodoList,
	processedTodos,
	todos,
	setActiveTodoListId,
}) => {
	const isDoneList = activeTodoList.id === TODO_LIST_DONE_ID;
	const isTodayList = activeTodoList.id === TODO_LIST_TODAY_ID;
	const isInboxList = activeTodoList.id === TODO_LIST_INBOX_ID;
	const isCustomList =
		[isDoneList, isTodayList, isInboxList].includes(true) === false;

	const isAnyTodo = processedTodos.length > 0;
	const inboxListTodosCount = todos
		.filter((todo) => todo.listId === TODO_LIST_INBOX_ID)
		.filter((todo) => todo.done === false).length;
	const isAnyInboxListTodo = inboxListTodosCount > 0;
	let title = ADD_A_TODO_TO_GET_STARTED;
	let description;
	let switchTodoListId = TODO_LIST_TODAY_ID;

	if (isInboxList) {
		description = SWITCH_TO_ + TODAY;
	} else if (isTodayList) {
		switchTodoListId = TODO_LIST_INBOX_ID;
		description = SWITCH_TO_ + INBOX;
		if (isAnyTodo === false && isAnyInboxListTodo) {
			title = NO_TODOS_YET;
			description = `${inboxListTodosCount} ${
				inboxListTodosCount > 1 ? "todos" : "todo"
			} in ${INBOX}`;
		}
	} else if (isDoneList) {
		title = "No completed todos yet";
		description = `Get started in ${TODAY}`;
	} else {
		title = NO_TODOS_YET;
		description = ADD_A_TODO_TO_GET_STARTED;
		switchTodoListId = null;
	}

	const switchTodoList = () =>
		switchTodoListId && setActiveTodoListId(switchTodoListId);

	return (
		<>
			<div className="todo-list-wrapper">
				<ol className={`todo-list ${isAnyTodo ? "" : "is-empty"}`}>
					<li className={`${isAnyTodo ? "" : "empty"}`}>
						<p className={`title ${isAnyTodo ? "" : "empty-title"}`}>{title}</p>
						<div
							className={`description ${
								isAnyTodo ? "" : isCustomList ? "" : "empty-link"
							}`}
							onClick={switchTodoList}
						>
							{description}
							{isCustomList === false && (
								<i className="icon icon-angle-right"></i>
							)}
						</div>
						<button className="button new-todo-button">New Todo</button>
					</li>
				</ol>
			</div>
			<footer
				className="footer-input new-todo-footer"
				style={{ visibility: "hidden" }}
			>
				<input
					id="todo-new"
					className="todo-input todo-new"
					type="text"
					placeholder="New Todo"
					autoComplete="off"
					// title="Use Ctrl-Enter to create a todo at top of the list"
				/>
			</footer>
		</>
	);
};
