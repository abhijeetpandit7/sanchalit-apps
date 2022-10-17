import React from "react";
import { DashLinks, Search, Soundscapes } from "../../containers";

export const TopRow = () => (
	<div className="top-row">
		<div className="region top-left">
			<Soundscapes />
			<Search topRow={true} />
			<DashLinks />
		</div>
		<div className="region top-center"></div>
		<div className="region top-right"></div>
		<div className="flash-message-container"></div>
	</div>
);
