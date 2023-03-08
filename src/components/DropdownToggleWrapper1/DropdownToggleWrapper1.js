import React, { useRef } from "react";
import { FocusOutHandler } from "../../hooks";
import { ACTIVE, hideRefClassName, toggleRefClassNames } from "../../utils";

export const DropdownToggleWrapper1 = ({
	children,
	setIsFocus = () => {},
} = {}) => {
	const moreDashRef = useRef(null);

	FocusOutHandler({
		ref: moreDashRef,
		classNames: [ACTIVE],
		callback: hideRefClassName,
		setIsFocus,
	});

	const toggleMoreDash = () => {
		toggleRefClassNames(moreDashRef, [ACTIVE]);
		setIsFocus(moreDashRef.current.classList.contains(ACTIVE));
	};

	return (
		<div
			className="active-list-container has-icon"
			ref={moreDashRef}
			onClick={toggleMoreDash}
		>
			{children}
		</div>
	);
};
