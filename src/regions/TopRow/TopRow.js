import React from "react";
import {
	AddMetric,
	DashLinks,
	Search,
	Soundscapes,
} from "../../containers";

export const TopRow = () => (
	<div className="top-row">
		<div className="region top-left">
			<Soundscapes />
			<Search topRow={true} />
			<DashLinks />
		</div>
		<div className="region top-center"></div>
		<div className="region top-right">
			<div className="base-metric app-container" data-v-f48f9f48>
				<div className="dash-items" data-v-f48f9f48>
					<AddMetric />
				</div>
			</div>
		</div>
		<div className="flash-message-container"></div>
	</div>
);
