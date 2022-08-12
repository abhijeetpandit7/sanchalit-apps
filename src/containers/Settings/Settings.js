import React from "react";
import { toggleIcon } from "../../utils";

export const Settings = () => {
	return (
		<div id="settings" className="app-container settings">
			<span className="app-dash toggle">{toggleIcon}</span>
		</div>
	);
};
