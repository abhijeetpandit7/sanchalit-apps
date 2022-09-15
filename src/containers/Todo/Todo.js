import React, { memo, useEffect } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";
import { TODO } from "../../utils";

const ContextMemo = memo(({ setWidgetReady }) => {
	useEffect(() => setWidgetReady({ widget: TODO }), []);

	return (
		<div id="todo" className="app-container todo">
			<div className="app-wrapper nipple nipple-bottom-right"></div>
			<span
				className="app-dash toggle Todo-toggle"
				data-test="todo-app-dash"
				data-ob="todo-app-dash"
			>
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
