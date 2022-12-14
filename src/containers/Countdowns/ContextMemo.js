import React, { memo, useEffect, useRef, useState } from "react";
import {
	COUNTDOWNS,
	ONE_SECOND,
	getDashAppStyles,
	getDateFullFormat,
	getSortedCountdowns,
	getTimeDifferenceFormat,
	toMilliseconds,
} from "../../utils";

// TODO: random item

const MetricItem = ({
	name,
	dueDate,
	hasHours,
	random,
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
			title={`${getDateFullFormat(dueDate)}${
				random ? " (Random Countdown)" : ""
			}`}
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
	({
		countdowns,
		showRandomMetricCountdown,
		setDashApp,
		setDashAppStyles,
		setWidgetReady,
	}) => {
		const sortedCountdowns = getSortedCountdowns(
			false,
			countdowns,
			showRandomMetricCountdown,
			true,
		);

		useEffect(() => {
			setWidgetReady({ widget: COUNTDOWNS });
		}, []);

		return (
			<>
				{sortedCountdowns.map((countdown) => (
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
