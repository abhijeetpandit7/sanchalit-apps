import React, { memo, useEffect, useRef, useState } from "react";
import { Navbar, NoteActions, UserActions, ViewContainer } from "../Notes";
import {
	angleDownIcon1,
	ellipsisIcon2,
	hideIcon,
	processNotes,
	toggleFullscreen,
} from "../../utils";

const ContextMemo = memo((props) => {
	return (
		<div className="app todo-app calculates-own-max-height">
			{/* DropZone */}
			<div className="drop-zone drop-left-zone">
				<span className="bar left-bar">
					<span className="bar-name"></span>
				</span>
			</div>
			<div className="drop-zone drop-right-zone">
				<span className="bar right-bar">
					<span className="bar-name"></span>
				</span>
			</div>

			{/* Navbar */}
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
									<li
										className="todo-list-choice-active "
										data-list-id="1-inbox"
									>
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

					<div className="todo-header-controls">
						<div id="todo-top-menu" className="todo-header-control more">
							<div className="icon-wrapper more-toggle">{ellipsisIcon2}</div>
							<div className="dropdown todo-actions-dropdown">
								<ul className="dropdown-list"></ul>
								<ul className="dropdown-list dropdown-detail"></ul>
							</div>
						</div>
						<div className="todo-header-control mobile-close">
							<span className="icon-wrapper u--mobile-show-bg hide">
								{hideIcon}
							</span>
						</div>
					</div>
				</div>
			</header>

			{/* ListWrapper */}
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

			{/* FooterInput */}
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
		</div>
	);
});

const App = () => {
	return (
		<ContextMemo
		/>
	);
};

export default App;
