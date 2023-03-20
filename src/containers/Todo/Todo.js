import React, {
	lazy,
	memo,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
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
	toggleAppPopup,
} from "../../utils";

const App = lazy(() => import("./App"));

const ContextMemo = memo(
	({ keepTodoState, showTodoList, setWidgetReady, toggleTodoSetting }) => {
		const todoRef = useRef(null);
		const [componentDidMount, setComponentDidMount] = useState(false);

		useEffect(async () => {
			if (showTodoList) {
				await toggleAppPopup(todoRef);
				await setComponentDidMount(true);
			}
			setWidgetReady({ widget: TODO });
		}, []);

		FocusOutHandler({ ref: todoRef, keepState: keepTodoState });

		const toggleTodoApp = () => {
			toggleAppPopup(todoRef);
			setComponentDidMount(true);
			keepTodoState && toggleTodoSetting(TODO_SHOW_SETTING);
		};

		return (
			<div id="todo" className="app-container todo" ref={todoRef}>
				<div className={`app-wrapper ${NIPPLE} ${NIPPLE_BOTTOM_RIGHT}`}>
					{componentDidMount && (
						<Suspense fallback={null}>
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
		storageUserCustomization: { todoVisible, todoSettings },
	} = useUserCustomization();
	const { setWidgetReady, toggleTodoSetting } = useUserActions();

	return (
		<>
			{todoVisible && (
				<ContextMemo
					{...{
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
