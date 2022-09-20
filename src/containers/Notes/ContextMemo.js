import React, { memo, useEffect } from "react";
import { NOTES } from "../../utils";

const ContextMemo = memo(({ setWidgetReady }) => {
	useEffect(() => setWidgetReady({ widget: NOTES }), []);

	return (
		<div id="notes" className="app-container notes">
			<div className="app-wrapper app-placeholder nipple nipple-bottom-right"></div>
			<span className="app-dash toggle Notes-toggle">Notes</span>
		</div>
	);
});

export default ContextMemo;
