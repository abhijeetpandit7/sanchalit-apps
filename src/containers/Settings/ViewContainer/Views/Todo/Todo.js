import React, { memo } from "react";
import {
	CollapsibleHeaderWrapper,
	ColourPaletteWrapper,
	ToggleSlider,
} from "../../../../../components";
import { useUserActions, useUserCustomization } from "../../../../../hooks";
import {
	cancelIcon,
	trashIcon,
	TODO,
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
	TODO_FEED_SETTING_LIST,
	GENERAL_SETTING_APP_LIST,
	TODO_SHOW_SETTING,
	processTodoLists,
} from "../../../../../utils";

const defaultTodoListIds = [
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
];

const ContextMemo = memo((props) => {
	const todoApp = GENERAL_SETTING_APP_LIST.find((app) => app.name === TODO);
	const toggleShowTodo = () => props.toggleShowApp(todoApp);
	const stayOpenSetting = TODO_FEED_SETTING_LIST[0];

	const toggleTodoFeedSetting = (setting) => {
		props.toggleTodoSetting(setting);
		// Toggle off showTodoList if stayOpen is toggled off
		if (
			setting.key === stayOpenSetting.key &&
			props.showTodoList &&
			props.keepTodoState
		)
			props.toggleTodoSetting(TODO_SHOW_SETTING);
	};

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

	const processedTodoLists = processTodoLists(props.todoLists);
	console.log(processedTodoLists);

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
								toggle={() => toggleTodoFeedSetting(setting)}
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
							{processedTodoLists.map(({ id, title, colour }) => (
								<li
									data-id={id}
									className="settings-todo-list draggable-todo-list"
									draggable="true"
								>
									<span className="settings-todo-list-color">
										<ColourPaletteWrapper todoListColour={colour} />
									</span>
									<span className="settings-todo-list-name">{title}</span>
									<span className="settings-list-right">
										<span className="action-group">
											{defaultTodoListIds.includes(id) ? (
												<span className="default">Default</span>
											) : (
												<>
													<span className="todo-rename-list action">
														Rename
													</span>
													<span
														className="todo-delete-list action"
														title="Delete"
													>
														{trashIcon}
													</span>
												</>
											)}
										</span>
										{/* <span className="delete-group">
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
										</span> */}
									</span>
								</li>
							))}

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
			todoLists,
			todoVisible,
			todoSettings: { keepTodoState, showTodoList },
		},
	} = useUserCustomization();
	const { toggleTodoSetting, toggleShowApp } = useUserActions();

	return (
		<ContextMemo
			{...{
				keepTodoState,
				showTodoList,
				todoLists,
				todoVisible,
				toggleTodoSetting,
				toggleShowApp,
			}}
		/>
	);
};

export default Todo;
