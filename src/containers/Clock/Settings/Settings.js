import React, { useRef } from "react";
import { DATA_TEST, HOUR_FORMAT, ON, toggleSwitch } from "../../../utils";

const Settings = () => {
	const dropdownRef = useRef(null);

	const toggleHour12Clock = () =>
		dropdownRef.current.querySelector(`[${DATA_TEST}]`).classList.toggle(ON);

	return (
		<div
			data-v-c8d4d4da
			className="dropdown more-dropdown app dash-dropdown dropdown-hide nipple nipple-top-left"
			ref={dropdownRef}
		>
			<ul data-v-c8d4d4da className="dropdown-list">
				<li
					className="dropdown-list-item has-toggle"
					data-test={HOUR_FORMAT}
					onClick={toggleHour12Clock}
				>
					<span className="dropdown-list-label">24-hour clock</span>
					<span className="toggle-slider">{toggleSwitch}</span>
				</li>
			</ul>
		</div>
	);
};

export default Settings;
