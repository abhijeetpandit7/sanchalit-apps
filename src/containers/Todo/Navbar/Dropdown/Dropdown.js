import React, { useEffect, useRef, useState } from "react";
import { FocusOutHandler } from "../../../../hooks";
import { TODO_LIST_DONE_ID, hideRefClassName } from "../../../../utils";

const Dropdown = ({
	todoAppRef,
	activeTodoListId,
	isParentFocus,
	processedTodoLists,
	todos,
	createTodoList,
	setActiveTodoListId,
	toggleActiveListContainer,
	updateAppHeight,
}) => {
	const [isFocus, setIsFocus] = useState(false);
	const listInputRef = useRef(null);

	useEffect(() => {
		updateAppHeight();
		todoAppRef.current.style.overflowY = isParentFocus ? "auto" : "hidden";
	}, [isParentFocus]);

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

	const TodoListChoices = processedTodoLists.map(({ id, title, colour }) => (
		<ul onClick={() => setActiveTodoListId(id)} key={id}>
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
						? todos.filter((todo) => todo.done).length
						: todos
								.filter((todo) => todo.listId === id)
								.filter((todo) => todo.done === false).length}
				</span>
			</li>
		</ul>
	));

	const TodoListAddRow = (
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

	return (
		<div className="dropdown nipple nipple-top-left">
			<div className="list-chooser dropdown-list">
				{TodoListChoices}
				{TodoListAddRow}
			</div>
		</div>
	);
};
export default Dropdown;
