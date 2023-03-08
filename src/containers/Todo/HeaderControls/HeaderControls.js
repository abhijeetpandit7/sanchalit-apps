import React, { lazy, memo, Suspense, useRef, useState } from "react";
import { FocusOutHandler } from "../../../hooks";
import {
	ACTIVE,
	ellipsisIcon1,
	hideRefClassName,
	toggleRefClassNames,
} from "../../../utils";

const Dropdown = lazy(() => import("./Dropdown/Dropdown"));

export const HeaderControls = memo((props) => {
	const headerControlRef = useRef(null);
	const [componentDidMount, setComponentDidMount] = useState(false);
	const [isFocus, setIsFocus] = useState(false);

	FocusOutHandler({
		ref: headerControlRef,
		classNames: [ACTIVE],
		callback: hideRefClassName,
		setIsFocus,
	});

	const toggleHeaderControl = () => {
		toggleRefClassNames(headerControlRef, [ACTIVE]);
		setComponentDidMount(true);
		setIsFocus(headerControlRef.current.classList.contains(ACTIVE));
	};

	return (
		<div className="todo-header-controls">
			<div
				id="todo-top-menu"
				className="todo-header-control more"
				ref={headerControlRef}
			>
				<div className="icon-wrapper more-toggle" onClick={toggleHeaderControl}>
					{ellipsisIcon1}
				</div>
				{componentDidMount && (
					<Suspense fallback={null}>
						<Dropdown {...props} {...{ isFocus, toggleHeaderControl }} />
					</Suspense>
				)}
			</div>
		</div>
	);
});
