import React from "react";

export const Todo = () => {
	return (
		<div id="todo" className="app-container todo">
			<div className="app-wrapper nipple nipple-bottom-right">
			</div>
			<span
				className="app-dash toggle Todo-toggle"
				data-test="todo-app-dash"
				data-ob="todo-app-dash"
			>
				Todo
			</span>
		</div>
	);
};
