import React from "react";
import { ellipsisIcon2, hideIcon } from "../../../utils";

export const HeaderControls = () => {
	return (
		<div className="todo-header-controls">
			<div id="todo-top-menu" className="todo-header-control more">
				<div className="icon-wrapper more-toggle">{ellipsisIcon2}</div>
				<div className="dropdown todo-actions-dropdown">
					<ul className="dropdown-list"></ul>
					<ul className="dropdown-list dropdown-detail"></ul>
				</div>
			</div>
			<div className="todo-header-control mobile-close">
				<span className="icon-wrapper u--mobile-show-bg hide">{hideIcon}</span>
			</div>
		</div>
	);
};
