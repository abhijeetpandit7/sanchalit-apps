import React, { useState, useEffect } from "react";
import {
	HeightResizeWrapper,
	WidthResizeWrapper,
	SwitchNavWrapper,
	MoreToggleWrapper,
} from "../../components";
import { getClockTime, ONE_SECOND } from "../../utils";

export const Clock = () => {
	const [clockTime, setClockTime] = useState(
		getClockTime({ hour12clock: true }),
	);

	useEffect(() => {
		const clockInterval = setInterval(() => {
			setClockTime(getClockTime({ hour12clock: true }));
		}, ONE_SECOND);

		return () => clearInterval(clockInterval);
	}, []);

	return (
		<HeightResizeWrapper>
			<div
				className="has-3-col app-container clock center-clock has-dash-icon"
				data-v-d6260d64
			>
				<div className="side-col left" data-v-d6260d64>
					<SwitchNavWrapper />
				</div>
				<div className="center-col" data-v-d6260d64>
					<WidthResizeWrapper>
						<span className="default-clock">
							<div className="time">{clockTime}</div>
						</span>
					</WidthResizeWrapper>
				</div>
				<div className="side-col right" data-v-d6260d64>
					<MoreToggleWrapper />
				</div>
			</div>
		</HeightResizeWrapper>
	);
};
