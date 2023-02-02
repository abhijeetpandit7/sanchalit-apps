import React, { memo } from "react";
import {
	CollapsibleHeaderWrapper,
	ToggleSlider,
} from "../../../../../components";
import { useUserActions, useUserCustomization } from "../../../../../hooks";
import {
	cancelIcon,
	checkIcon,
	trashIcon,
	TODO,
	TODO_FEED_SETTING_LIST,
	GENERAL_SETTING_APP_LIST,
} from "../../../../../utils";

const ContextMemo = memo((props) => {
	const todoApp = GENERAL_SETTING_APP_LIST.find((app) => app.name === TODO);
	const toggleShowTodo = () => props.toggleShowApp(todoApp);

	const CollapsibleContent = () => (
		<>
			<h4>General</h4>
			<ul className="settings-list options-list">
				<ToggleSlider
					{...todoApp}
					name="Enable Todo"
					description="Create a to-do list system that works best for you"
					value={props.todoVisible}
					toggle={toggleShowTodo}
				/>
			</ul>
		</>
	);

	return (
		<div id="settings-todo" className="settings-view settings-todo">
			<div className="main-container">
				<CollapsibleHeaderWrapper
					header="Todo"
					description="Break your goals into manageable pieces"
				>
					<CollapsibleContent />
				</CollapsibleHeaderWrapper>

				<div className="section section-settings first">
					<ul className="settings-list options-list">
						{TODO_FEED_SETTING_LIST.map((setting) => (
							<ToggleSlider
								key={setting.key}
								value={props[setting.key]}
								toggle={() => props.toggleTodoSetting(setting)}
								{...setting}
							/>
						))}
					</ul>
				</div>

				<div className="section section-custom-todo">
					<h4>
						CUSTOM TO-DO LISTS
						<span className="badge badge-plus">PLUS</span>
					</h4>
					<p className="subdescription">
						Organize your todos into multiple lists
					</p>

					<div id="custom-lists" className="settings-todo-lists-container">
						{/* TODO: Make it draggable */}
						<ul className="settings-list options-list settings-todo-lists">
							<li
								data-id="inbox"
								className="settings-todo-list draggable-todo-list"
								draggable="true"
							>
								<span className="settings-todo-list-color">
									<ul className="color-palette-wrapper">
										<div className="swatch-container">
											<div
												className="swatch null-color"
												style={{ background: "rgba(0, 0, 0, 0)" }}
											></div>
										</div>
									</ul>
								</span>
								<span className="settings-todo-list-name">Inbox</span>
								<span className="settings-list-right">
									<span className="action-group">
										<span className="default">Default</span>
									</span>
								</span>
							</li>
							<li
								data-id="today"
								className="settings-todo-list draggable-todo-list"
								draggable="true"
							>
								<span className="settings-todo-list-color">
									<ul className="color-palette-wrapper active">
										<div className="swatch-container">
											<div
												className="swatch"
												style={{ background: "rgb(240, 90, 15)" }}
											></div>
										</div>
										<ul className="nipple nipple-bottom-left swatch-color-picker todo-color-picker">
											<li style={{ background: "#d42022" }}>{checkIcon}</li>
											<li style={{ background: "#f05a0f" }}>{checkIcon}</li>
											<li style={{ background: "#ffaa00" }}>{checkIcon}</li>
											<li style={{ background: "#eae60b" }}>{checkIcon}</li>
											<li style={{ background: "#9fea0a" }}>{checkIcon}</li>
											<li style={{ background: "#40dc19" }}>{checkIcon}</li>
											<li style={{ background: "#05eba6" }}>{checkIcon}</li>
											<li style={{ background: "#17ccde" }}>{checkIcon}</li>
											<li style={{ background: "#14a7eb" }}>{checkIcon}</li>
											<li style={{ background: "#336be8" }}>{checkIcon}</li>
											<li style={{ background: "#5d56da" }}>{checkIcon}</li>
											<li style={{ background: "#990099" }}>{checkIcon}</li>
											<li style={{ background: "#c30f62" }}>{checkIcon}</li>
											<li style={{ background: "#e377c2" }}>{checkIcon}</li>
											<li style={{ background: "#e6e6e6" }}>{checkIcon}</li>
											<li className="no-color active">{checkIcon}</li>
										</ul>
									</ul>
								</span>
								<span className="settings-todo-list-name">Today</span>
								<span className="settings-list-right">
									<span className="action-group">
										<span className="default">Default</span>
									</span>
								</span>
							</li>
							<li
								data-id="done"
								className="settings-todo-list draggable-todo-list"
								draggable="true"
							>
								<span className="settings-todo-list-color">
									<ul className="color-palette-wrapper">
										<div className="swatch-container">
											<div
												className="swatch null-color"
												style={{ background: "rgba(0, 0, 0, 0)" }}
											></div>
										</div>
									</ul>
								</span>
								<span className="settings-todo-list-name">Done</span>
								<span className="settings-list-right">
									<span className="action-group">
										<span className="default">Default</span>
									</span>
								</span>
							</li>
							<li
								data-id=""
								className="settings-todo-list draggable-todo-list"
								draggable="true"
							>
								<span className="settings-todo-list-color">
									<ul className="color-palette-wrapper">
										<div className="swatch-container">
											<div
												className="swatch null-color"
												style={{ background: "rgba(0, 0, 0, 0)" }}
											></div>
										</div>
									</ul>
								</span>
								<span className="settings-todo-list-name">NewList4</span>
								<span className="settings-list-right">
									<span className="action-group">
										<span className="todo-rename-list action">Rename</span>
										<span className="todo-delete-list action" title="Delete">
											{trashIcon}
										</span>
									</span>
									<span className="delete-group" title="">
										<span className="delete-1">
											<span className="delete delete-msg">Delete list?</span>
											<span className="delete delete-yes clickable">Yes</span>
											<span className="delete delete-no clickable">No</span>
										</span>
										<span className="delete-2">
											<span className="delete delete-msg-2">
												List has 1 todo.
											</span>
											<span className="delete move-todos clickable">
												Move to Inbox
											</span>
											<span className="delete delete-cancel clickable">
												Cancel
											</span>
										</span>
									</span>
								</span>
							</li>
							<li className="settings-todo-add-list">
								<input
									type="text"
									className="settings-todo-add-list-input"
									placeholder="+ Add a list"
									autoComplete="off"
								/>
								<span className="toggle-add-list settings-cancel">
									<span className="icon-wrapper">{cancelIcon}</span>
								</span>
								<button
									className="button toggle-form toggle-add-list show"
									data-test="settings-todo-add-list"
								>
									<i className="icon icon-plus"></i>Add List
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
});

const Todo = () => {
	const {
		storageUserCustomization: {
			todoVisible,
			todoSettings: { keepTodoState },
		},
	} = useUserCustomization();
	const { toggleTodoSetting, toggleShowApp } = useUserActions();

	return (
		<ContextMemo
			{...{
				keepTodoState,
				todoVisible,
				toggleTodoSetting,
				toggleShowApp,
			}}
		/>
	);
};

export default Todo;
