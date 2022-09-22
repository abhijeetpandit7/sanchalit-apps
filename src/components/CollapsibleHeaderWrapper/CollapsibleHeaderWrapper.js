import React, { useRef } from "react";
import { ACTIVE } from "../../utils";

const ADDITIONAL_HEIGHT = 30;
const SMOOTH_HEIGHT_CONTENT = "smooth-height-content";

export const CollapsibleHeaderWrapper = (props) => {
	const SmoothHeightWrapperRef = useRef(null);

	const toggleHeader = () => {
		const WrapperHeight = SmoothHeightWrapperRef.current.offsetHeight;
		const WrapperScrollHeight = SmoothHeightWrapperRef.current.scrollHeight;
		SmoothHeightWrapperRef.current.style.height =
			WrapperHeight === 0 ? `${WrapperScrollHeight + ADDITIONAL_HEIGHT}px` : 0;

		const WrapperContent = SmoothHeightWrapperRef.current.querySelector(
			`.${SMOOTH_HEIGHT_CONTENT}`,
		);
		WrapperHeight === 0
			? WrapperContent.classList.add(ACTIVE)
			: WrapperContent.classList.remove(ACTIVE);
	};

	return (
		<>
			<div className="subpanel-header">
				<span className="button-advanced" onClick={toggleHeader}>
					Settings<i className="icon icon-angle-down"></i>
				</span>
				<h3>{props.header}</h3>
				<p className="description">{props.description}</p>
			</div>
			<div
				className="smooth-height-wrapper"
				style={{ height: "0" }}
				ref={SmoothHeightWrapperRef}
			>
				<div className={`${SMOOTH_HEIGHT_CONTENT}`}>
					<div className="wrapper-advanced" style={{ display: "block" }}>
						{props.children}
					</div>
				</div>
			</div>
		</>
	);
};
