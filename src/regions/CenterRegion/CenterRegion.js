import React from "react";
import { Clock, GreetingMantra } from "../../containers";

export const CenterRegion = () => {
	return (
		<div className="region center">
			<div className="center-container">
				<Clock />
				<GreetingMantra />
			</div>
		</div>
	);
};
