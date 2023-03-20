import React, {
	Fragment,
	lazy,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
import _ from "lodash";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { FocusOutHandler } from "../../../hooks";
import {
	ACTIVE,
	INBOX,
	TODAY,
	TODO_LIST_DONE_ID,
	TODO_LIST_INBOX_ID,
	TODO_LIST_TODAY_ID,
	ellipsisIcon1,
	formatDate,
	hideRefClassName,
	reorderListOnDrag,
	toggleRefClassNames,
} from "../../../utils";

const ADD_A_TODO_TO_GET_STARTED = "Add a todo to get started";
const NO_TODOS_YET = "No todos yet";
const SWITCH_TO_ = "Switch to ";

const Dropdown = lazy(() => import("./Dropdown/Dropdown"));

const TodoItem = (props) => {
	const { activeTodoList, item, editTodoItemTitle, toggleTodoItemDone } = props;

	const moreRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);
	const [isFocus, setIsFocus] = useState(false);

	FocusOutHandler({
		ref: moreRef,
		classNames: [ACTIVE],
		callback: hideRefClassName,
		setIsFocus,
	});

	const isDoneList = activeTodoList.id === TODO_LIST_DONE_ID;

	const toggleMore = () => {
		toggleRefClassNames(moreRef, [ACTIVE]);
		setComponentDidMount(true);
		setIsFocus(moreRef.current.classList.contains(ACTIVE));
	};

	const todoItemTitleClickHandler = (event) => {
		switch (event.detail) {
			case 2:
				editTodoItemTitle(event, item.id);
			default:
				return;
		}
	};

	return (
		<li
			className={`todo-item visible ${isFocus ? ACTIVE : ""} ${
				item.done ? "done" : ""
			}`}
			ref={props.provided?.innerRef}
			data-todo-id={item.id}
			draggable={isDoneList ? "false" : "true"}
			{...props.provided?.draggableProps}
			{...props.provided?.dragHandleProps}
		>
			<span className="todo-item-wrapper has-more">
				<label onClick={() => toggleTodoItemDone(item.id, item.done)}>
					<input
						className="todo-item-checkbox"
						type="checkbox"
						defaultChecked={item.done}
					/>
				</label>
				<span className="todo-item-title" onClick={todoItemTitleClickHandler}>
					{item.title}
				</span>
				<div className="more" ref={moreRef}>
					<div className="icon-wrapper more-toggle" onClick={toggleMore}>
						{ellipsisIcon1}
					</div>
					{componentDidMount && (
						<Suspense fallback={null}>
							<Dropdown
								{...props}
								{...{ isParentFocus: isFocus, toggleMore }}
							/>
						</Suspense>
					)}
				</div>
			</span>
		</li>
	);
};

export const ViewContainer = (props) => {
	const {
		todoInputRef,
		activeTodoList,
		processedTodos,
		todos,
		createTodoItem,
		setActiveTodoListId,
		setTodoItemOrder,
	} = props;
	const [isCreatingTodo, setIsCreatingTodo] = useState(false);

	useEffect(() => isCreatingTodo && setIsCreatingTodo(false), [activeTodoList]);

	const todoListWrapper = useRef(null);

	const isDoneList = activeTodoList.id === TODO_LIST_DONE_ID;
	const isTodayList = activeTodoList.id === TODO_LIST_TODAY_ID;
	const isInboxList = activeTodoList.id === TODO_LIST_INBOX_ID;
	const isCustomList =
		[isDoneList, isTodayList, isInboxList].includes(true) === false;

	const isAnyTodo = processedTodos.length > 0;
	const inboxListTodosCount = todos
		.filter((todo) => todo.listId === TODO_LIST_INBOX_ID)
		.filter((todo) => todo.done === false).length;
	const isAnyInboxListTodo = inboxListTodosCount > 0;
	let title = ADD_A_TODO_TO_GET_STARTED;
	let description;
	let switchTodoListId = TODO_LIST_TODAY_ID;

	if (isInboxList) {
		description = SWITCH_TO_ + TODAY;
	} else if (isTodayList) {
		switchTodoListId = TODO_LIST_INBOX_ID;
		description = SWITCH_TO_ + INBOX;
		if (isAnyTodo === false && isAnyInboxListTodo) {
			title = NO_TODOS_YET;
			description = `${inboxListTodosCount} ${
				inboxListTodosCount > 1 ? "todos" : "todo"
			} in ${INBOX}`;
		}
	} else if (isDoneList) {
		title = "No completed todos yet";
		description = `Get started in ${TODAY}`;
	} else {
		title = NO_TODOS_YET;
		description = ADD_A_TODO_TO_GET_STARTED;
		switchTodoListId = null;
	}

	const switchTodoList = () =>
		switchTodoListId && setActiveTodoListId(switchTodoListId);

	const newTodoButtonClickHandler = async () => {
		await setIsCreatingTodo(true);
		todoInputRef.current.focus();
	};

	const newTodoEnterHandler = async (event) => {
		if (event.key !== "Enter") {
			return;
		}
		const isCtrlEnter = event.ctrlKey;
		event.preventDefault();
		const todoInput = todoInputRef.current;
		if (todoInput.value.trim() === "") {
			return;
		}
		todoInput.disabled = true;
		await createTodoItem(todoInput.value, activeTodoList.id, isCtrlEnter);
		const todoList = todoListWrapper.current.querySelector(".todo-list");
		todoList.scrollTop = isCtrlEnter || isDoneList ? 0 : todoList.scrollHeight;
		todoInput.disabled = false;
		todoInput.value = "";
		todoInput.focus();
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const reorderedTodoItems = reorderListOnDrag(
			processedTodos,
			result.source.index,
			result.destination.index,
		);
		reorderedTodoItems.forEach(
			async (todoItem, index) =>
				todoItem.order !== index &&
				(await setTodoItemOrder(todoItem.id, index)),
		);
	};

	const EmptyView = () => (
		<li className="empty">
			<p className="title empty-title">{title}</p>
			<div
				className={`description ${isCustomList ? "" : "empty-link"}`}
				onClick={switchTodoList}
			>
				{description}
				{isCustomList === false && <i className="icon icon-angle-right"></i>}
			</div>
			<button
				className="button new-todo-button"
				style={{ opacity: `${isCreatingTodo ? 0 : 1}` }}
				onClick={newTodoButtonClickHandler}
			>
				New Todo
			</button>
		</li>
	);

	const DoneListTodoItems = () => {
		const todoItemObjects = _.map(processedTodos, (todo) => {
			const date = new Date(todo.completedDate);
			return {
				sortDate: date.getTime(),
				year: date.getFullYear(),
				month: date.getMonth(),
				day: date.getDate(),
				item: todo,
			};
		});
		const sortedTodoItemObjects = _(todoItemObjects)
			.sortBy("sortDate")
			.reverse()
			.value();

		let year = null,
			month = null,
			day = null;
		return _.map(sortedTodoItemObjects, (todoObj) => {
			let todoSection;
			if (
				year != todoObj.year ||
				month != todoObj.month ||
				day != todoObj.day
			) {
				year = todoObj.year;
				month = todoObj.month;
				day = todoObj.day;
				const calendarDate = formatDate({
					timestamp: todoObj.sortDate,
					calendarDate: true,
				});
				const friendlyDate = formatDate({
					timestamp: todoObj.sortDate,
					friendlyDate: true,
				});
				const todoSectionTitle =
					calendarDate !== friendlyDate ? calendarDate : "";
				todoSection = (
					<li
						className="todo-section"
						title={todoSectionTitle}
						data-view-section-parent-id={todoSectionTitle}
						draggable="false"
					>
						{friendlyDate}
					</li>
				);
				todoObj.item["viewSectionId"] = calendarDate;
			}

			return (
				<Fragment key={todoObj.item.id}>
					{todoSection}
					<TodoItem {...props} {...{ item: todoObj.item }} />
				</Fragment>
			);
		});
	};

	return (
		<>
			<div className="todo-list-wrapper" ref={todoListWrapper}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="droppable" direction="vertical">
						{(provided) => (
							<ol
								className={`todo-list ${isAnyTodo ? "" : "is-empty"}`}
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{isAnyTodo ? (
									isDoneList ? (
										<DoneListTodoItems />
									) : (
										<>
											{processedTodos.map((todo, index) => (
												<Draggable
													draggableId={todo.id}
													index={index}
													key={todo.id}
												>
													{(provided) => (
														<TodoItem
															{...props}
															{...{ item: todo, provided }}
														/>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</>
									)
								) : (
									<EmptyView />
								)}
							</ol>
						)}
					</Droppable>
				</DragDropContext>
			</div>
			<footer
				className="footer-input new-todo-footer"
				style={{
					visibility: `${isAnyTodo || isCreatingTodo ? "visible" : "hidden"}`,
				}}
			>
				<input
					id="todo-new"
					className="todo-input todo-new"
					ref={todoInputRef}
					onKeyDown={newTodoEnterHandler}
					type="text"
					placeholder="New Todo"
					autoComplete="off"
					title="Use Ctrl-Enter to create a todo at top of the list"
				/>
			</footer>
		</>
	);
};
