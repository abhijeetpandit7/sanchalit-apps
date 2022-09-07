import React from "react";
import { Clock, GreetingMantra } from "../../containers";

export const CenterRegion = () => (
	<div className="region center">
		<div className="center-container">
			<Clock />
			<GreetingMantra />
		</div>
	</div>
);
