import React, { lazy, Suspense, useRef, useState } from "react";
import { FocusOutHandler } from "../../../hooks";
import {
	angleDownIcon1,
	ACTIVE,
	hideRefClassName,
	toggleRefClassNames,
} from "../../../utils";

const Dropdown = lazy(() => import("./Dropdown/Dropdown"));

export const Navbar = (props) => {
	const {
		colour: activeTodoListColor,
		id: activeTodoListId,
		title: activeTodoListTitle,
	} = props.activeTodoList;

	const activeListContainerRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);
	const [isFocus, setIsFocus] = useState(false);

	FocusOutHandler({
		ref: activeListContainerRef,
		classNames: [ACTIVE],
		callback: hideRefClassName,
		setIsFocus,
	});

	const toggleActiveListContainer = () => {
		toggleRefClassNames(activeListContainerRef, [ACTIVE]);
		setComponentDidMount(true);
		setIsFocus(activeListContainerRef.current.classList.contains(ACTIVE));
	};

	return (
		<header className="header todo-header has-assignee sanchalit-todo">
			<div className="todo-header-row">
				<div
					className="list-color"
					style={{ backgroundColor: activeTodoListColor }}
				></div>
				<div
					className="active-list-container has-icon"
					ref={activeListContainerRef}
					onClick={toggleActiveListContainer}
				>
					<span
						className="list-name active-list-name "
						title={activeTodoListTitle}
					>
						{activeTodoListTitle}
					</span>
					<div className="list-chooser-toggle icon-wrapper">
						{angleDownIcon1}
					</div>
					{componentDidMount && (
						<Suspense fallback={null}>
							<Dropdown
								{...{
									todoAppRef: props.todoAppRef,
									activeTodoListId,
									isParentFocus: isFocus,
									processedTodoLists: props.processedTodoLists,
									todos: props.todos,
									createTodoList: props.createTodoList,
									setActiveTodoListId: props.setActiveTodoListId,
									toggleActiveListContainer,
									updateAppHeight: props.updateAppHeight,
								}}
							/>
						</Suspense>
					)}
				</div>
				{props.children}
			</div>
		</header>
	);
};
