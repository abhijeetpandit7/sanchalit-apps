import React from "react";
import { switchIcon } from "../../utils";

export const SwitchNavWrapper = ({ children }) => (
	<div className="slot-wrapper" data-v-d6260d64>
		<div className="container">
			<div className="icon-wrapper dash-icon-wrapper" data-v-5d777ef8>
				{switchIcon}
			</div>
			{children}
		</div>
	</div>
);
