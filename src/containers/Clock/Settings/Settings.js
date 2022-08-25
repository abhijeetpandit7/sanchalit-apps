import React from "react";
import { toggleSwitch } from "../../../utils";

const Settings = () => (
	<div
		data-v-c8d4d4da
		className="dropdown more-dropdown app dash-dropdown dropdown-hide nipple nipple-top-left"
	>
		<ul data-v-c8d4d4da className="dropdown-list">
			<li className="dropdown-list-item has-toggle">
				<span className="dropdown-list-label">24-hour clock</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
		</ul>
	</div>
);

export default Settings;
