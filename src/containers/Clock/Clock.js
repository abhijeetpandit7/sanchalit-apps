import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
	HeightResizeWrapper,
	WidthResizeWrapper,
	MoreToggleWrapper,
} from "../../components";
import { useUserActions, useUserCustomization } from "../../hooks";
import { CLOCK, ONE_SECOND, getClockTime, toMilliseconds } from "../../utils";

const Loading = () => (
	<div className="dropdown more-dropdown app dash-dropdown dropdown-hide nipple nipple-top-left">
		<ul data-v-c8d4d4da className="dropdown-list">
			<li className="dropdown-list-item">
				<i className="loading-icon"></i>
				Loading...
			</li>
		</ul>
	</div>
);

const Settings = lazy(() => import("./Settings/Settings"));

const ContextMemo = memo(({ hour12clock, setWidgetReady }) => {
	const [clockTime, setClockTime] = useState(getClockTime({ hour12clock }));
	const [componentDidMount, setComponentDidMount] = useState(false);

	useEffect(() => {
		const clockInterval = setInterval(() => {
			setClockTime(getClockTime({ hour12clock }));
		}, toMilliseconds(ONE_SECOND));
		setClockTime(getClockTime({ hour12clock }));
		setWidgetReady({ widget: CLOCK });

		return () => clearInterval(clockInterval);
	}, [hour12clock]);

	const toggleSettingsApp = () => setComponentDidMount(true);

	return (
		<HeightResizeWrapper>
			<div
				className="has-3-col app-container clock center-clock has-dash-icon"
				data-v-d6260d64
			>
				<div className="side-col left" data-v-d6260d64></div>
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
							<Suspense fallback={<Loading />}>
								<Settings />
							</Suspense>
						)}
					</MoreToggleWrapper>
				</div>
			</div>
		</HeightResizeWrapper>
	);
});

export const Clock = () => {
	const {
		storageUserCustomization: { clockVisible, hour12clock },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<>{clockVisible && <ContextMemo {...{ hour12clock, setWidgetReady }} />}</>
	);
};
