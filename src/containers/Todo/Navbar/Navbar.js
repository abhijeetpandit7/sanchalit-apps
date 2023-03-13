import React, { useEffect, useRef, useState } from "react";
import { FocusOutHandler } from "../../../hooks";
import {
	angleDownIcon1,
	ACTIVE,
	TODO_LIST_DONE_ID,
	hideRefClassName,
	toggleRefClassNames,
} from "../../../utils";

const TodoListAddRow = ({ createTodoList, toggleActiveListContainer }) => {
	const [isFocus, setIsFocus] = useState(false);
	const listInputRef = useRef(null);

	FocusOutHandler({
		ref: listInputRef,
		classNames: [],
		callback: hideRefClassName,
		setIsFocus,
	});

	const newListEnterHandler = async (event) => {
		if (event.key !== "Enter") {
			return;
		}
		event.preventDefault();
		const listInput = listInputRef.current;
		if (listInput.value.trim() === "") {
			return;
		}
		listInput.disabled = true;
		await createTodoList(listInput.value);
		listInput.disabled = false;
		listInput.value = "";
		toggleActiveListContainer();
	};

	return (
		// TODO: Disable new list if not plus user
		<ul
			className={`todo-list-add-row ${isFocus ? "input-mode" : ""}`}
			onClick={(event) => event.stopPropagation()}
		>
			<li>
				<span
					id="add-icon"
					className="todo-list-add-icon"
					style={{
						display: isFocus || listInputRef.current?.value ? "none" : "block",
					}}
				>
					<i className="icon icon-plus"></i>
				</span>
				<input
					id="list-new"
					className="todo-input todo-list-add-input"
					ref={listInputRef}
					onClick={() => setIsFocus(true)}
					onKeyDown={newListEnterHandler}
					type="text"
					placeholder={isFocus ? "" : "    New List"}
					autoComplete="off"
				/>
			</li>
		</ul>
	);
};

export const Navbar = (props) => {
	const {
		colour: activeTodoListColor,
		id: activeTodoListId,
		title: activeTodoListTitle,
	} = props.activeTodoList;

	const activeListContainerRef = useRef(null);
	const [isFocus, setIsFocus] = useState(false);

	FocusOutHandler({
		ref: activeListContainerRef,
		classNames: [ACTIVE],
		callback: hideRefClassName,
		setIsFocus,
	});

	useEffect(() => {
		props.updateAppHeight();
		props.todoAppRef.current.style.overflowY = isFocus ? "auto" : "hidden";
	}, [isFocus]);

	const toggleActiveListContainer = () => {
		toggleRefClassNames(activeListContainerRef, [ACTIVE]);
		setIsFocus(activeListContainerRef.current.classList.contains(ACTIVE));
	};

	const Dropdown = () => (
		<div className="dropdown nipple nipple-top-left">
			<div className="list-chooser dropdown-list">
				{props.processedTodoLists.map(({ id, title, colour }) => (
					<ul onClick={() => props.setActiveTodoListId(id)} key={id}>
						<li
							className={`${
								id === activeTodoListId
									? "todo-list-choice-active"
									: "todo-list-choice"
							}`}
						>
							<div className="list-color" style={{ backgroundColor: colour }}>
								&nbsp;
							</div>
							<span className="list-name">{title}</span>
							<span className="todo-count">
								{id === TODO_LIST_DONE_ID
									? props.todos.filter((todo) => todo.done).length
									: props.todos
											.filter((todo) => todo.listId === id)
											.filter((todo) => todo.done === false).length}
							</span>
						</li>
					</ul>
				))}
				<TodoListAddRow
					{...{
						createTodoList: props.createTodoList,
						toggleActiveListContainer,
					}}
				/>
			</div>
		</div>
	);

	return (
		<header className="header todo-header has-assignee sanchalit-todo">
			<div className="todo-header-row">
				<div
					className="list-color"
					style={{ backgroundColor: activeTodoListColor }}
				></div>
				<div
					className="active-list-container has-icon"
					ref={activeListContainerRef}
					onClick={toggleActiveListContainer}
				>
					<span
						className="list-name active-list-name "
						title={activeTodoListTitle}
					>
						{activeTodoListTitle}
					</span>
					<div className="list-chooser-toggle icon-wrapper">
						{angleDownIcon1}
					</div>
					<Dropdown />
				</div>
				{props.children}
			</div>
		</header>
	);
};
