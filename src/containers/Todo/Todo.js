import React, { memo } from "react";
import { useUserCustomization } from "../../hooks";

const ContextMemo = memo(() => {
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

	return <>{todoVisible && <ContextMemo />}</>;
};
