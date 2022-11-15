import React, { memo, useEffect, useRef, useState } from "react";
import App from "./App";
import {
	SHOW,
	addIcon,
	getDashAppStyles,
	parseAppPopupOverflow,
	hideAppPopup,
	toggleAppPopup,
} from "../../utils";

const ContextMemo = memo(
	({ countdownsRef, dashAppRef, app, setDashApp, setDashAppStyles }) => {
		const addMetricRef = useRef(null);

		const [componentDidMount, setComponentDidMount] = useState(false);

		useEffect(() => {
			const onFocusOutHandler = (event) => {
				if (
					dashAppRef.current
						? !dashAppRef.current.contains(event.target)
						: !addMetricRef.current.contains(event.target)
				) {
					hideAppPopup(addMetricRef);
					if (
						countdownsRef.current &&
						!countdownsRef.current.contains(event.target)
					) {
						setDashApp(null);
					}
				}
			};
			document.addEventListener("mousedown", onFocusOutHandler);

			return () => document.removeEventListener("mousedown", onFocusOutHandler);
		}, []);

		const notShowingDashApp = app === null;

		const toggleAddMetricApp = async () => {
			await setComponentDidMount(true);
			await toggleAppPopup(addMetricRef);
			// TODO: Add parameter if top-right(2)
			try {
				parseAppPopupOverflow(addMetricRef, true);
			} catch (error) {
				console.error(error);
			}
			const isActiveMetric = addMetricRef.current.classList.contains(SHOW);
			isActiveMetric
				? setDashAppStyles(getDashAppStyles(addMetricRef, true))
				: setDashApp(null);
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
				{componentDidMount && notShowingDashApp && <App {...{ setDashApp }} />}
			</div>
		);
	},
);

export default ContextMemo;
