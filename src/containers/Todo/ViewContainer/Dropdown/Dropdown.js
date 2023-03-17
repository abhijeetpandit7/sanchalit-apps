import React, { useEffect, useRef, useState } from "react";
import { FocusOutHandler } from "../../../../hooks";
import {
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
	ensureTodoItemDropdownVisible,
	hideRefClassName,
	toggleRefClassNames,
} from "../../../../utils";

const SHOW_DETAIL = "show-detail";

const Dropdown = ({
	todoAppRef,
	isParentFocus,
	activeTodoList,
	item,
	processedTodoLists,
	updateAppHeight,
}) => {
	const dropdownRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);
	const [isFocus, setIsFocus] = useState(false);
	const [dropdownDetailHeight, setDropdownDetailHeight] = useState(null);

	FocusOutHandler({
		ref: dropdownRef,
		classNames: [SHOW_DETAIL],
		callback: hideRefClassName,
		setIsFocus,
	});

	useEffect(() => {
		if (isParentFocus) {
			const ifNotVisibleGetHeight = ensureTodoItemDropdownVisible(
				todoAppRef,
				dropdownRef,
				isFocus ? dropdownDetailHeight + 20 : null,
			);
			ifNotVisibleGetHeight !== true && updateAppHeight(ifNotVisibleGetHeight);
		} else updateAppHeight(0);
	}, [isParentFocus, dropdownDetailHeight]);

	useEffect(() => {
		if (isFocus) {
			const dropdownDetailOffsetHeight =
				dropdownRef.current.querySelector(".dropdown-detail").offsetHeight;
			updateAppHeight(dropdownDetailOffsetHeight);
			setDropdownDetailHeight(dropdownDetailOffsetHeight);
		} else setDropdownDetailHeight(null);
	}, [isFocus]);

	const toggleDropdownDetail = () => {
		toggleRefClassNames(dropdownRef, [SHOW_DETAIL]);
		setComponentDidMount(true);
		setIsFocus(dropdownRef.current.classList.contains(SHOW_DETAIL));
	};

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

	const DropdownDetail = () => (
		<ul className="dropdown-list dropdown-detail">
			<li
				className="dropdown-list-item dropdown-detail-back dropdown-list-label"
				onClick={toggleDropdownDetail}
			>
				<i className="icon icon-left dropdown-detail-title-back"></i>
			</li>
			<>
				{processedTodoLists
					.filter((todoList) => todoList.id !== activeTodoList.id)
					.map((todoList) => (
						<li className="dropdown-list-item no-icon" key={todoList.id}>
							<span
								className="list-color menu-item-color"
								style={{ backgroundColor: todoList.colour }}
							>
								&nbsp;
							</span>
							<span className="dropdown-list-label">{todoList.title}</span>
						</li>
					))}
			</>
		</ul>
	);

	return (
		<div
			className="dropdown todo-item-dropdown"
			style={{
				display: isParentFocus ? "block" : "none",
				visibility: isParentFocus ? "visible" : "hidden",
				opacity: isParentFocus ? "1" : "0",
				height: isFocus ? `${dropdownDetailHeight}px` : "auto",
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
				<li
					className="dropdown-list-item no-icon"
					onClick={toggleDropdownDetail}
				>
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
			{componentDidMount && <DropdownDetail />}
		</div>
	);
};

export default Dropdown;
