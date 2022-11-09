import React, { memo, useEffect, useState } from "react";
import {
	COUNTDOWNS,
	ONE_SECOND,
	getDateFullFormat,
	getTimeDifferenceFormat,
	toMilliseconds,
} from "../../utils";

// TODO: random item

const MetricItem = ({ name, dueDate, hasHours }) => {
	const [timeDifference, setTimeDifference] = useState(0);

	useEffect(() => {
		setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		const timeInterval = setInterval(() => {
			setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		}, toMilliseconds(ONE_SECOND));
		return () => clearInterval(timeInterval);
	}, [dueDate]);

	return (
		<div
			className="app-dash metric-item add-shadow"
			title={getDateFullFormat(dueDate)}
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

const ContextMemo = memo((props) => {
	const filteredCountdowns = props.countdowns.filter(
		(countdown) => countdown.pinned,
	);

	useEffect(() => {
		props.setWidgetReady({ widget: COUNTDOWNS });
	}, []);

	return (
		<>
			{filteredCountdowns.map((countdown) => (
				<MetricItem {...countdown} key={countdown.id} />
			))}
		</>
	);
});

export default ContextMemo;
