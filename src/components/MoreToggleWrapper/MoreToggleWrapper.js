import React, { useRef } from "react";
import { FocusOutHandler } from "../../hooks";
import { ellipsisIcon, toggleAppPopup } from "../../utils";

export const MoreToggleWrapper = (props) => {
	const moreDashRef = useRef(null);

	FocusOutHandler({ ref: moreDashRef });

	const toggleMoreDash = () => {
		toggleAppPopup(moreDashRef);
		props.onToggle();
	};

	return (
		<div className="slot-wrapper">
			<div className="more more-dash" ref={moreDashRef}>
				<div
					className="icon-wrapper more-toggle dash-icon-wrapper u--touch-hide"
					onClick={toggleMoreDash}
				>
					{ellipsisIcon}
				</div>
				{props.children}
			</div>
		</div>
	);
};
