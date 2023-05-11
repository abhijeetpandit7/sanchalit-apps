import React, { memo, useRef, useState } from "react";
import _ from "lodash";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import {
	useAuthActions,
	useUserActions,
	useUserCustomization,
} from "../../../../../hooks";
import {
	CollapsibleHeaderWrapper,
	ColourPaletteWrapper,
	ToggleSlider,
} from "../../../../../components";
import {
	cancelIcon,
	trashIcon,
	INBOX,
	TODO,
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
	TODO_FEED_SETTING_LIST,
	GENERAL_SETTING_APP_LIST,
	TODO_SHOW_SETTING,
	processTodoLists,
	reorderListOnDrag,
} from "../../../../../utils";

const TodoList = ({
	id,
	title,
	colour,
	deleteTodoList,
	editTodoListTitle,
	getTodoListItemsCount,
	moveAllTodoItems,
	setTodoListColour,
	provided,
}) => {
	const defaultTodoListIds = [
		TODO_LIST_DONE_ID,
		TODO_LIST_INBOX_ID,
		TODO_LIST_TODAY_ID,
	];
	const isDefaultTodoList = defaultTodoListIds.includes(id);

	const [isClickedTrash, setIsClickedTrash] = useState(false);
	const [isClickedYes, setIsClickedYes] = useState(false);
	const [isDeletingTodoList, setIsDeletingTodoList] = useState(false);
	const [todoListItemsCount, setTodoListItemsCount] = useState(0);

	const todoListTitleClickHandler = (event) => {
		if (isDefaultTodoList) return;
		switch (event.detail) {
			case 2:
				editTodoListTitle(event, id);
			default:
				return;
		}
	};

	const todoListTrashClickHandler = (event) => {
		event.stopPropagation();
		const itemsCount = getTodoListItemsCount(id);
		setTodoListItemsCount(itemsCount);
		setIsClickedTrash(true);
		if (itemsCount === 0) {
			setIsDeletingTodoList(true);
			deleteTodoList(id);
		}
	};

	const moveTodosAndDeleteTodoList = async () => {
		setIsDeletingTodoList(true);
		await moveAllTodoItems(id, TODO_LIST_INBOX_ID);
		await deleteTodoList(id);
	};

	const DeleteGroup = () => (
		<span
			className="delete-group"
			style={{ display: isClickedTrash ? "inline" : "none" }}
		>
			<span
				className="delete-1"
				style={{
					display: isClickedYes || isDeletingTodoList ? "none" : "inline",
				}}
			>
				<span className="delete delete-msg">Delete list?</span>
				<span
					className="delete delete-yes clickable"
					onClick={(event) => {
						event.stopPropagation();
						setIsClickedYes(true);
					}}
				>
					Yes
				</span>
				<span
					className="delete delete-no clickable"
					onClick={(event) => {
						event.stopPropagation();
						setIsClickedTrash(false);
					}}
				>
					No
				</span>
			</span>

			<span
				className="delete-2"
				style={{
					display: isClickedYes && !isDeletingTodoList ? "inline" : "none",
				}}
			>
				<span className="delete delete-msg-2">{`List has ${todoListItemsCount} ${
					todoListItemsCount > 1 ? "todos" : "todo"
				}.`}</span>
				<span
					className="delete move-todos clickable"
					onClick={(event) => {
						event.stopPropagation();
						moveTodosAndDeleteTodoList();
					}}
				>
					Move to {INBOX}
				</span>
				<span
					className="delete delete-cancel clickable"
					onClick={(event) => {
						event.stopPropagation();
						setIsClickedYes(false);
						setIsClickedTrash(false);
					}}
				>
					Cancel
				</span>
			</span>

			<span
				className="delete delete-loading"
				style={{ display: isDeletingTodoList ? "inline" : "none" }}
			>
				Deleting...
			</span>
		</span>
	);

	return (
		<li
			data-id={id}
			className="settings-todo-list draggable-todo-list"
			ref={provided.innerRef}
			onClick={todoListTitleClickHandler}
			draggable="true"
			key={id}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			<span className="settings-todo-list-color">
				<ColourPaletteWrapper
					{...{ todoListColour: colour, todoListId: id, setTodoListColour }}
				/>
			</span>
			<span className="settings-todo-list-name">{title}</span>
			<span className="settings-list-right">
				<span
					className="action-group"
					style={{ display: isClickedTrash ? "none" : "" }}
				>
					{isDefaultTodoList ? (
						<span className="default">Default</span>
					) : (
						<>
							<span
								className="todo-rename-list action"
								onClick={(event) => editTodoListTitle(event, id)}
							>
								Rename
							</span>
							<span
								className="todo-delete-list action"
								onClick={todoListTrashClickHandler}
								title="Delete"
							>
								{trashIcon}
							</span>
						</>
					)}
				</span>
				{isClickedTrash && <DeleteGroup />}
			</span>
		</li>
	);
};

const AddList = ({ createTodoList }) => {
	const [isCreatingTodoList, setIsCreatingTodoList] = useState(false);
	const listInputRef = useRef(null);

	const newListEnterHandler = async (event) => {
		if (event.key !== "Enter") {
			return;
		}
		event.preventDefault();
		const listInput = listInputRef.current;
		if (listInput.value.trim() === "") {
			return;
		}
		listInput.disabled = true;
		await createTodoList(listInput.value);
		listInput.disabled = false;
		listInput.value = "";
		setIsCreatingTodoList(false);
	};

	return (
		<li className="settings-todo-add-list">
			<input
				className="settings-todo-add-list-input"
				style={{ display: isCreatingTodoList ? "inline-block" : "" }}
				ref={listInputRef}
				onKeyDown={newListEnterHandler}
				type="text"
				placeholder="+ Add a list"
				autoComplete="off"
			/>
			<span
				className={`toggle-add-list settings-cancel
					${isCreatingTodoList ? "show" : ""}
			`}
				onClick={() => setIsCreatingTodoList(false)}
			>
				<span className="icon-wrapper">{cancelIcon}</span>
			</span>
			<button
				className={`button toggle-form toggle-add-list ${
					isCreatingTodoList ? "" : "show"
				}`}
				onClick={async () => {
					await setIsCreatingTodoList(true);
					listInputRef.current.focus();
				}}
			>
				<i className="icon icon-plus"></i>Add List
			</button>
		</li>
	);
};

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

	const handleDragEnd = async (result) => {
		if (!result.destination) return;

		const reorderedTodoLists = reorderListOnDrag(
			processedTodoLists,
			result.source.index,
			result.destination.index,
		);
		let updatedItems = [];
		await reorderedTodoLists.map(async (todoList, index) => {
			if (todoList.order !== index)
				updatedItems.push(await props.setTodoListOrder(todoList.id, index));
		});
		await Promise.all(updatedItems);
		if (updatedItems.length) {
			const updatedObject = {
				todoLists: updatedItems.map((item) => item.todoList),
				todoSettings: _.last(updatedItems).todoSettings,
			};
			props.postUserData("/todoList", updatedObject);
		}
	};

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
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable droppableId="droppable" direction="vertical">
								{(provided) => (
									<ul
										className="settings-list options-list settings-todo-lists"
										ref={provided.innerRef}
										{...provided.droppableProps}
									>
										{processedTodoLists.map((todoList, index) => (
											<Draggable
												key={todoList.id}
												draggableId={todoList.id}
												index={index}
											>
												{(provided) => (
													<TodoList
														{...todoList}
														deleteTodoList={props.deleteTodoList}
														editTodoListTitle={props.editTodoListTitle}
														getTodoListItemsCount={props.getTodoListItemsCount}
														moveAllTodoItems={props.moveAllTodoItems}
														setTodoListColour={props.setTodoListColour}
														provided={provided}
													/>
												)}
											</Draggable>
										))}
										{provided.placeholder}
										<AddList createTodoList={props.createTodoList} />
									</ul>
								)}
							</Droppable>
						</DragDropContext>
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
	const {
		createTodoList,
		deleteTodoList,
		editTodoListTitle,
		getTodoListItemsCount,
		moveAllTodoItems,
		setTodoListColour,
		setTodoListOrder,
		toggleTodoSetting,
		toggleShowApp,
	} = useUserActions();
	const { postUserData } = useAuthActions();

	return (
		<ContextMemo
			{...{
				keepTodoState,
				showTodoList,
				todoLists,
				todoVisible,
				createTodoList,
				deleteTodoList,
				editTodoListTitle,
				getTodoListItemsCount,
				moveAllTodoItems,
				postUserData,
				setTodoListColour,
				setTodoListOrder,
				toggleTodoSetting,
				toggleShowApp,
			}}
		/>
	);
};

export default Todo;
