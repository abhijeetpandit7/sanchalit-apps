import React, { memo, useEffect, useRef, useState } from "react";
import {
	COUNTDOWNS,
	ONE_SECOND,
	getDashAppStyles,
	getDateFullFormat,
	getTimeDifferenceFormat,
	toMilliseconds,
} from "../../utils";

// TODO: random item

const MetricItem = ({
	name,
	dueDate,
	hasHours,
	setDashApp,
	setDashAppStyles,
}) => {
	const metricItemRef = useRef(null);
	const [timeDifference, setTimeDifference] = useState(0);

	useEffect(() => {
		setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		const timeInterval = setInterval(() => {
			setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		}, toMilliseconds(ONE_SECOND));
		return () => clearInterval(timeInterval);
	}, [dueDate]);

	// TODO: Close metric item popup on toggle
	const handleClick = () => {
		setDashApp(COUNTDOWNS);
		setDashAppStyles(getDashAppStyles(metricItemRef));
	};

	return (
		<div
			className="app-dash metric-item add-shadow"
			title={getDateFullFormat(dueDate)}
			onClick={handleClick}
			ref={metricItemRef}
			data-v-6544f510
			data-v-f48f9f48
		>
			<div className="metric-stat" data-v-6544f510>
				{timeDifference}
			</div>
			<div className="metric-label" data-v-6544f510>
				<span className="metric-label-name" data-v-6544f510>
					{name}
				</span>
			</div>
		</div>
	);
};

const ContextMemo = memo(
	({ countdowns, setDashApp, setDashAppStyles, setWidgetReady }) => {
		const filteredCountdowns = countdowns.filter(
			(countdown) => countdown.pinned,
		);

		useEffect(() => {
			setWidgetReady({ widget: COUNTDOWNS });
		}, []);

		return (
			<>
				{filteredCountdowns.map((countdown) => (
					<MetricItem
						{...{
							...countdown,
							setDashApp,
							setDashAppStyles,
						}}
						key={countdown.id}
					/>
				))}
			</>
		);
	},
);

export default ContextMemo;
