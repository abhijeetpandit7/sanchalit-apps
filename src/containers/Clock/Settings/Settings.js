import React from "react";
import { useUserCustomization } from "../../../hooks";
import { ON, toggleSwitch } from "../../../utils";

const MemoizedComponent = React.memo(({ hour12clock, toggleHour12Clock }) => (
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
	const { storageUserCustomization, setStorageUserCustomization } =
		useUserCustomization();

	const toggleHour12Clock = () =>
		setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			hour12clock: !prevCustomization.hour12clock,
		}));

	return (
		<MemoizedComponent
			hour12clock={storageUserCustomization.hour12clock}
			toggleHour12Clock={toggleHour12Clock}
		/>
	);
};

export default Settings;
