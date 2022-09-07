import React from "react";
import { Search } from "../../containers";

export const TopRow = () => (
	<div className="top-row">
		<div className="region top-left">
			<Search topRow={true} />
		</div>
		<div className="region top-center"></div>
		<div className="region top-right"></div>
		<div className="flash-message-container"></div>
	</div>
);
