import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
	FocusOutHandler,
	useUserActions,
	useUserCustomization,
} from "../../hooks";
import {
	NIPPLE,
	NIPPLE_BOTTOM_RIGHT,
	TODO,
	TODO_SHOW_SETTING,
	hideAppPopup,
	toggleAppPopup,
} from "../../utils";

const App = lazy(() => import("./App"));

const Loading = () => (
	<div className="app todo-app" style={{ height: "250px" }}>
		<div className="app-loading" data-v-d1d2d8c8>
			Loading… <div className="loading-icon"></div>
		</div>
	</div>
);

const ContextMemo = memo(
	({
		todoAppRef,
		keepTodoState,
		showTodoList,
		setWidgetReady,
		toggleTodoSetting,
	}) => {
		const [componentDidMount, setComponentDidMount] = useState(false);

		useEffect(async () => {
			if (showTodoList) {
				await toggleAppPopup(todoAppRef);
				await setComponentDidMount(true);
			}
			setWidgetReady({ widget: TODO });
		}, []);

		useEffect(() => {
			if (showTodoList === false) hideAppPopup(todoAppRef);
		}, [showTodoList]);

		FocusOutHandler({ ref: todoAppRef, keepState: keepTodoState });

		const toggleTodoApp = () => {
			toggleAppPopup(todoAppRef);
			setComponentDidMount(true);
			keepTodoState && toggleTodoSetting(TODO_SHOW_SETTING);
		};

		return (
			<div id="todo" className="app-container todo" ref={todoAppRef}>
				<div className={`app-wrapper ${NIPPLE} ${NIPPLE_BOTTOM_RIGHT}`}>
					{componentDidMount && (
						<Suspense fallback={<Loading />}>
							<App />
						</Suspense>
					)}
				</div>
				<span className="app-dash toggle Todo-toggle" onClick={toggleTodoApp}>
					Todo
				</span>
			</div>
		);
	},
);

export const Todo = () => {
	const {
		todoAppRef,
		storageUserCustomization: { todoVisible, todoSettings },
	} = useUserCustomization();
	const { setWidgetReady, toggleTodoSetting } = useUserActions();

	return (
		<>
			{todoVisible && (
				<ContextMemo
					{...{
						todoAppRef,
						keepTodoState: todoSettings.keepTodoState,
						showTodoList: todoSettings.showTodoList,
						setWidgetReady,
						toggleTodoSetting,
					}}
				/>
			)}
		</>
	);
};
