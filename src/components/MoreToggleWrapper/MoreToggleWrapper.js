import React from "react";
import { ellipsisIcon } from "../../utils";

export const MoreToggleWrapper = ({ children }) => (
	<div className="slot-wrapper">
		<div className="more more-dash">
			<div className="icon-wrapper more-toggle dash-icon-wrapper u--touch-hide" data-v-5d777ef8>
				{ellipsisIcon}
			</div>
			{children}
		</div>
	</div>
);
