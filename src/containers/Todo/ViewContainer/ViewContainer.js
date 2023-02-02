import React from "react";

export const ViewContainer = () => {
	return (
		<>
			<div className="todo-list-wrapper">
				<ol className="todo-list is-empty">
					<li className="empty">
						<p className="title empty-title">Add a todo to get started</p>
						<div className="description empty-link">
							Switch to Today
							<i className="icon icon-angle-right"></i>
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
					title="Use Ctrl-Enter to create a todo at top of the list"
				/>
			</footer>
		</>
	);
};
