import React from "react";
import { angleDownIcon1 } from "../../../utils";

export const Navbar = (props) => {
	return (
		<header className="header todo-header has-assignee sanchalit-todo">
			<div className="todo-header-row">
				<div
					className="list-color"
					style={{ backgroundColor: "rgba(0,0,0,0)" }}
				></div>
				<div className="active-list-container has-icon">
					<img className="provider-icon" src="" />
					<span className="list-name active-list-name " title="Inbox">
						Inbox
					</span>
					<div className="list-chooser-toggle icon-wrapper">
						{angleDownIcon1}
					</div>
					<div className="dropdown nipple nipple-top-left">
						<div className="list-chooser dropdown-list">
							<ul data-list-id="1-inbox">
								<li className="todo-list-choice-active " data-list-id="1-inbox">
									<div className="list-color" style={{ backgroundColor: "" }}>
										&nbsp;
									</div>
									<span className="list-name">Inbox</span>
									<span className="todo-count">0</span>
								</li>
							</ul>
							<ul data-list-id="1-today">
								<li className="todo-list-choice " data-list-id="1-today">
									<div
										className="list-color"
										style={{ backgroundColor: "rgba(240,90,15,1)" }}
									>
										&nbsp;
									</div>
									<span className="list-name">Today</span>
									<span className="todo-count">5</span>
								</li>
							</ul>
							<ul data-list-id="1-done">
								<li className="todo-list-choice " data-list-id="1-done">
									<div
										className="list-color"
										style={{ backgroundColor: "rgba(0,0,0,0)" }}
									>
										&nbsp;
									</div>
									<span className="list-name">Done</span>
									<span className="todo-count">9</span>
								</li>
							</ul>
							<ul className="todo-list-add-row">
								<li>
									<span
										id="add-icon"
										className="todo-list-add-icon"
										style={{ display: "block" }}
									>
										<i className="icon icon-plus"></i>
									</span>
									<input
										id="list-new"
										className="todo-input todo-list-add-input"
										type="text"
										placeholder="    New List"
										autoComplete="off"
									/>
									<span
										className="loading todo-list-add-loading"
										style={{ display: "none" }}
									>
										<i className="loading-icon"></i> <span>Loading...</span>
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{props.children}
			</div>
		</header>
	);
};
