import React, { useEffect, useRef } from "react";
import {
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
	ensureTodoItemDropdownVisible,
} from "../../../../utils";

const Dropdown = ({
	todoAppRef,
	isFocus,
	activeTodoList,
	item,
	processedTodoLists,
	updateAppHeight,
}) => {
	const dropdownRef = useRef(null);

	useEffect(() => {
		if (isFocus) {
			const ifNotVisibleGetHeight = ensureTodoItemDropdownVisible(
				todoAppRef,
				dropdownRef,
			);
			ifNotVisibleGetHeight !== true && updateAppHeight(ifNotVisibleGetHeight);
		} else updateAppHeight(0);
	}, [isFocus]);

	const isDoneList = activeTodoList.id === TODO_LIST_DONE_ID;
	const isTodayList = activeTodoList.id === TODO_LIST_TODAY_ID;

	const isTodoItemDone = item.done;
	const isTodoItemListDoneList = item.listId === TODO_LIST_DONE_ID;
	const todoItemHomeList = processedTodoLists.find(
		(todoList) => todoList.id === item.homeListId,
	);
	let moveToTodoList;

	if (isDoneList && isTodoItemListDoneList === false) {
		const todoItemList = processedTodoLists.find(
			(todoList) => todoList.id === item.listId,
		);
		moveToTodoList = todoItemList;
	} else if (todoItemHomeList && todoItemHomeList.id !== activeTodoList.id) {
		moveToTodoList = todoItemHomeList;
	} else if (isTodayList || isDoneList) {
		const inboxList = processedTodoLists.find(
			(todoList) => todoList.id === TODO_LIST_INBOX_ID,
		);
		moveToTodoList = inboxList;
	} else {
		const todayList = processedTodoLists.find(
			(todoList) => todoList.id === TODO_LIST_TODAY_ID,
		);
		moveToTodoList = todayList;
	}

	return (
		<div
			className="dropdown todo-item-dropdown"
			style={{
				display: isFocus ? "block" : "none",
				visibility: isFocus ? "visible" : "hidden",
				opacity: isFocus ? "1" : "0",
				height: "auto",
			}}
			ref={dropdownRef}
		>
			<ul className="dropdown-list">
				<li className="dropdown-list-item no-icon">
					<span className="dropdown-list-label">Edit</span>
				</li>
				<li className="dropdown-list-item line">
					<span className="dropdown-list-label"></span>
				</li>
				<li className="dropdown-list-item no-icon">
					<span className="dropdown-list-label">{`Move to ${moveToTodoList.title}`}</span>
				</li>
				<li className="dropdown-list-item no-icon">
					<span className="dropdown-list-label">Move to...</span>
				</li>
				{isTodoItemDone && isDoneList === false && (
					<li className="dropdown-list-item no-icon">
						<span className="dropdown-list-label">Archive</span>
					</li>
				)}
				<li className="dropdown-list-item line">
					<span className="dropdown-list-label"></span>
				</li>
				<li className="dropdown-list-item no-icon">
					<span className="dropdown-list-label">Delete</span>
				</li>
			</ul>
			<ul className="dropdown-list dropdown-detail"></ul>
		</div>
	);
};

export default Dropdown;
