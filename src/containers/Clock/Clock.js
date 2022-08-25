import React, { useState, useEffect } from "react";
import {
	HeightResizeWrapper,
	WidthResizeWrapper,
	SwitchNavWrapper,
	MoreToggleWrapper,
} from "../../components";
import {Settings} from "./Settings/Settings";
import { ONE_SECOND, getClockTime, toMilliseconds } from "../../utils";

export const Clock = () => {
	const [clockTime, setClockTime] = useState(
		getClockTime({ hour12clock: true }),
	);
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => {
		const clockInterval = setInterval(() => {
			setClockTime(getClockTime({ hour12clock: true }));
		}, toMilliseconds(ONE_SECOND));

		return () => clearInterval(clockInterval);
	}, []);

	const toggleSettingsApp = () => setComponentDidMount(true);

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
					<MoreToggleWrapper onToggle={toggleSettingsApp}>
						{componentDidMount && (
								<Settings />
						)}
					</MoreToggleWrapper>
				</div>
			</div>
		</HeightResizeWrapper>
	);
};
