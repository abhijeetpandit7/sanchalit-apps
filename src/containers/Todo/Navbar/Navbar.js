import React from "react";
import { DropdownToggleWrapper1 } from "../../../components";
import { angleDownIcon1 } from "../../../utils";

export const Navbar = (props) => {
	const {
		color: activeTodoListColor,
		id: activeTodoListId,
		title: activeTodoListTitle,
	} = props.activeTodoList;

	return (
		<header className="header todo-header has-assignee sanchalit-todo">
			<div className="todo-header-row">
				<div
					className="list-color"
					style={{ backgroundColor: activeTodoListColor }}
				></div>
				<DropdownToggleWrapper1>
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
							{props.processedTodoLists.map(({ id, title, color }) => (
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
											style={{ backgroundColor: color }}
										>
											&nbsp;
										</div>
										<span className="list-name">{title}</span>
										<span className="todo-count">
											{
												props.todos
													.filter((todo) => todo.listId === id)
													.filter((todo) => todo.done === false).length
											}
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
