import React, { useEffect, useState } from "react";
import {
	INBOX,
	TODAY,
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
	ellipsisIcon1,
} from "../../../utils";

const ADD_A_TODO_TO_GET_STARTED = "Add a todo to get started";
const NO_TODOS_YET = "No todos yet";
const SWITCH_TO_ = "Switch to ";

export const ViewContainer = ({
	todoInputRef,
	activeTodoList,
	processedTodos,
	todos,
	createTodoItem,
	setActiveTodoListId,
}) => {
	const [isCreatingTodo, setIsCreatingTodo] = useState(false);

	useEffect(() => isCreatingTodo && setIsCreatingTodo(false), [activeTodoList]);

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

	const newTodoButtonClickHandler = async () => {
		await setIsCreatingTodo(true);
		todoInputRef.current.focus();
	};

	const newTodoEnterHandler = async (event) => {
		// TODO: Use Ctrl+Enter as well
		if (event.key !== "Enter") {
			return;
		}
		event.preventDefault();
		const todoInput = todoInputRef.current;
		if (todoInput.value.trim() === "") {
			return;
		}
		todoInput.disabled = true;
		await createTodoItem(todoInput.value, activeTodoList.id);
		todoInput.disabled = false;
		todoInput.value = "";
		todoInput.focus();
	};

	const EmptyView = () => (
		<li className="empty">
			<p className="title empty-title">{title}</p>
			<div
				className={`description ${isCustomList ? "" : "empty-link"}`}
				onClick={switchTodoList}
			>
				{description}
				{isCustomList === false && <i className="icon icon-angle-right"></i>}
			</div>
			<button
				className="button new-todo-button"
				style={{ opacity: `${isCreatingTodo ? 0 : 1}` }}
				onClick={newTodoButtonClickHandler}
			>
				New Todo
			</button>
		</li>
	);

	const TodoItem = ({ id, title }) => (
		<li className="todo-item visible" data-todo-id={id} draggable="true">
			<span className="todo-item-wrapper has-more">
				<label>
					<input className="todo-item-checkbox" type="checkbox" />
				</label>
				<span className="todo-item-title">{title}</span>
				<div className="more">
					<div className="icon-wrapper more-toggle">{ellipsisIcon1}</div>
					<div className="dropdown todo-item-dropdown">
						<ul className="dropdown-list"></ul>
						<ul className="dropdown-list dropdown-detail"></ul>
					</div>
				</div>
			</span>
		</li>
	);

	return (
		<>
			<div className="todo-list-wrapper">
				<ol className={`todo-list ${isAnyTodo ? "" : "is-empty"}`}>
					{isAnyTodo ? (
						processedTodos.map((todo) => <TodoItem {...todo} key={todo.id} />)
					) : (
						<EmptyView />
					)}
				</ol>
			</div>
			<footer
				className="footer-input new-todo-footer"
				style={{
					visibility: `${isAnyTodo || isCreatingTodo ? "visible" : "hidden"}`,
				}}
			>
				<input
					id="todo-new"
					className="todo-input todo-new"
					ref={todoInputRef}
					onKeyDown={newTodoEnterHandler}
					type="text"
					placeholder="New Todo"
					autoComplete="off"
					// title="Use Ctrl-Enter to create a todo at top of the list"
				/>
			</footer>
		</>
	);
};
