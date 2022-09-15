import React, { memo } from "react";
import { useUserActions, useUserCustomization } from "../../../hooks";
import { ON, toggleSwitch } from "../../../utils";

const ContextMemo = memo(({ hour12clock, toggleHour12Clock }) => (
	<div
		data-v-c8d4d4da
		className="dropdown more-dropdown app dash-dropdown dropdown-hide nipple nipple-top-left"
	>
		<ul data-v-c8d4d4da className="dropdown-list">
			<li
				className={`dropdown-list-item has-toggle ${hour12clock ? "" : ON}`}
				onClick={toggleHour12Clock}
			>
				<span className="dropdown-list-label">24-hour clock</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
		</ul>
	</div>
));

const Settings = () => {
	const {
		storageUserCustomization: { hour12clock },
	} = useUserCustomization();
	const { toggleHour12Clock } = useUserActions();

	return <ContextMemo {...{ hour12clock, toggleHour12Clock }} />;
};

// Memoized to prevent re-render on every setClockTime
export default memo(Settings);
