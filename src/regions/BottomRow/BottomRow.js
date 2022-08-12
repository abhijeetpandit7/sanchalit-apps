import React from "react";
import { Settings, PhotoInfo, Quote, Notes, Todo } from "../../containers";

export const BottomRow = () => {
	return (
		<div className="bottom-row">
			<div className="region bottom-left">
				<Settings />
				<PhotoInfo />
			</div>
			<div className="region bottom">
				<Quote />
			</div>
			<div className="region bottom-right">
				<Notes />
				<Todo />
			</div>
		</div>
	);
};
