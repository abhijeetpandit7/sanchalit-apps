import React, { useEffect, useState } from "react";
import { DropdownToggleWrapper1 } from "../../../components";
import { TODO_LIST_DONE_ID, angleDownIcon1 } from "../../../utils";

export const Navbar = (props) => {
	const {
		colour: activeTodoListColor,
		id: activeTodoListId,
		title: activeTodoListTitle,
	} = props.activeTodoList;

	const [isFocus, setIsFocus] = useState(false);

	useEffect(() => props.updateAppHeight(), [isFocus]);

	return (
		<header className="header todo-header has-assignee sanchalit-todo">
			<div className="todo-header-row">
				<div
					className="list-color"
					style={{ backgroundColor: activeTodoListColor }}
				></div>
				<DropdownToggleWrapper1 {...{ setIsFocus }}>
					<span
						className="list-name active-list-name "
						title={activeTodoListTitle}
					>
						{activeTodoListTitle}
					</span>
					<div className="list-chooser-toggle icon-wrapper">
						{angleDownIcon1}
					</div>
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
										<div
											className="list-color"
											style={{ backgroundColor: colour }}
										>
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
							{/* TODO: Disable new list if not plus user */}
							<ul
								className="todo-list-add-row"
								onClick={(event) => event.stopPropagation()}
							>
								<li>
									<span id="add-icon" className="todo-list-add-icon">
										<i className="icon icon-plus"></i>
									</span>
									<input
										id="list-new"
										className="todo-input todo-list-add-input"
										type="text"
										placeholder="    New List"
										autoComplete="off"
									/>
								</li>
							</ul>
						</div>
					</div>
				</DropdownToggleWrapper1>
				{props.children}
			</div>
		</header>
	);
};
