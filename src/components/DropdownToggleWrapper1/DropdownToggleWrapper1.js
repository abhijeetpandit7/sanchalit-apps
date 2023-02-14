import React, { useRef } from "react";
import { FocusOutHandler } from "../../hooks";
import { ACTIVE, hideRefClassName, toggleRefClassNames } from "../../utils";

export const DropdownToggleWrapper1 = (props) => {
	const moreDashRef = useRef(null);

	FocusOutHandler({
		ref: moreDashRef,
		classNames: [ACTIVE],
		callback: hideRefClassName,
	});

	const toggleMoreDash = () => {
		toggleRefClassNames(moreDashRef, [ACTIVE]);
	};

	return (
		<div
			className="active-list-container has-icon"
			ref={moreDashRef}
			onClick={toggleMoreDash}
		>
			{props.children}
		</div>
	);
};
