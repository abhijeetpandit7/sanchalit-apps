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
import { NIPPLE, NIPPLE_BOTTOM_RIGHT, TODO, toggleAppPopup } from "../../utils";

const App = lazy(() => import("./App"));

const ContextMemo = memo(({ setWidgetReady }) => {
	const todoRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => setWidgetReady({ widget: TODO }), []);

	// TODO: Conditional variable: Stay open
	FocusOutHandler({ ref: todoRef });

	const toggleTodoApp = () => {
		toggleAppPopup(todoRef);
		setComponentDidMount(true);
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
});

export const Todo = () => {
	const {
		storageUserCustomization: { todoVisible },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return <>{todoVisible && <ContextMemo {...{ setWidgetReady }} />}</>;
};
