import React, { memo, useRef, useState } from "react";
import App from "./App";
import { FocusOutHandler } from "../../hooks";
import { addIcon, parseAppPopupOverflow, toggleAppPopup } from "../../utils";

const ContextMemo = memo(() => {
	const addMetricRef = useRef(null);

	const [componentDidMount, setComponentDidMount] = useState(false);

	FocusOutHandler({ ref: addMetricRef });

	const toggleAddMetricApp = async () => {
		await setComponentDidMount(true);
		await toggleAppPopup(addMetricRef);
		// TODO: Add parameter if top-right
		parseAppPopupOverflow(addMetricRef, true);
	};

	return (
		<div
			className="app-container add-metric needs-hover"
			data-v-76a7e140
			data-v-f48f9f48
			ref={addMetricRef}
		>
			<div
				className="app-dash metric-item add-shadow"
				onClick={toggleAddMetricApp}
				data-v-76a7e140
			>
				<div className="metric-stat" data-v-76a7e140>
					<span className="placeholder" data-v-76a7e140>
						{addIcon}
					</span>
				</div>
				<div className="metric-label" data-v-76a7e140>
					<span className="metric-label-name" data-v-76a7e140>
						Add
					</span>
				</div>
			</div>
			{componentDidMount && <App />}
		</div>
	);
});

export default ContextMemo;
