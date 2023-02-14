import React from "react";
import { clearTasksIcon, moveToTodayIcon } from "../../../../utils";

const Dropdown = () => {
	return (
		<div className="dropdown todo-actions-dropdown">
			<ul className="dropdown-list">
				{/* Don't show in Today & Done */}
				<li
					className="dropdown-list-item"
					title="Move all tasks from this list to Today"
				>
					<span className="dropdown-list-icon-wrapper">{moveToTodayIcon}</span>
					<span className="dropdown-list-label">Send tasks to Today</span>
				</li>
				{/* Show only in Today */}
				<li
					className="dropdown-list-item"
					title="Send tasks to Inbox/original lists"
				>
					<span className="dropdown-list-icon-wrapper">{clearTasksIcon}</span>
					<span className="dropdown-list-label">Clear the day</span>
				</li>
				{/* Show only if any completed task */}
				<li className="dropdown-list-item">
					<span className="dropdown-list-icon-wrapper">{clearTasksIcon}</span>
					<span className="dropdown-list-label">Clear completed tasks</span>
				</li>
				<li className="dropdown-list-item line">
					<span className="dropdown-list-label"></span>
				</li>
				<li className="dropdown-list-item no-icon">
					<span className="dropdown-list-label">Settings</span>
				</li>
			</ul>
		</div>
	);
};

export default Dropdown;
