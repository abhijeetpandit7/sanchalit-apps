import React, { memo, useEffect } from "react";
import { TODO } from "../../utils";

const ContextMemo = memo(({ setWidgetReady }) => {
	useEffect(() => setWidgetReady({ widget: TODO }), []);

	return (
		<div id="todo" className="app-container todo">
			<div className="app-wrapper nipple nipple-bottom-right"></div>
			<span className="app-dash toggle Todo-toggle">Todo</span>
		</div>
	);
});

export default ContextMemo;
