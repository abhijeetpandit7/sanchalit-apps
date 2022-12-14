import React from "react";
import { Notes, PhotoInfo, Quote, Settings, Todo } from "../../containers";

export const BottomRow = () => (
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
