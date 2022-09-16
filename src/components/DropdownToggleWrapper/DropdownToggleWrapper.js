import React, { useRef } from "react";
import { FocusOutHandler } from "../../hooks";
import { dropdownIcon, toggleAppPopup } from "../../utils";

export const DropdownToggleWrapper = (props) => {
	const moreDashRef = useRef(null);

	FocusOutHandler({ ref: moreDashRef });

	const toggleMoreDash = () => {
		toggleAppPopup(moreDashRef);
		props.onToggle();
	};

	return (
		<div
			className="more source more-dash"
			ref={moreDashRef}
			onClick={toggleMoreDash}
		>
			<div className="source-toggle" tabIndex="0">
				<div className="source-selected">
					<img className="icon icon-source active" src={props.iconSource} />
				</div>
				{dropdownIcon}
			</div>
			{props.children}
		</div>
	);
};
