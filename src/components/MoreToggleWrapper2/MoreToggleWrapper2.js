import React, { useRef } from "react";
import { FocusOutHandler } from "../../hooks";
import {
	ACTIVE,
	ellipsisIcon1,
	hideRefClassName,
	toggleRefClassNames,
} from "../../utils";

export const MoreToggleWrapper2 = (props) => {
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
			className="dropdown-wrapper"
			ref={moreDashRef}
			data-v-407a49db
			data-v-57e867a2
		>
			<div
				className="icon-wrapper more-toggle"
				onClick={toggleMoreDash}
				data-v-407a49db
			>
				{ellipsisIcon1}
			</div>
			{props.children}
		</div>
	);
};
