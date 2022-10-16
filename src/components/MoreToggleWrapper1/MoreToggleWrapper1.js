import React, { useRef } from "react";
import { FocusOutHandler } from "../../hooks";
import {
	ACTIVE,
	ellipsisIcon2,
	hideRefClassName,
	toggleRefClassNames,
} from "../../utils";

export const MoreToggleWrapper1 = (props) => {
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
		<div className="more" ref={moreDashRef}>
			<div className="icon-wrapper more-toggle" onClick={toggleMoreDash}>
				{ellipsisIcon2}
			</div>
			{props.children}
		</div>
	);
};
