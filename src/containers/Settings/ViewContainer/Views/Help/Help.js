import React, { useRef, useState } from "react";
import {
	FADEIN,
	QUICK_TIP_LIST,
	randomElement,
	removeRefClassName,
	addRefClassName,
} from "../../../../../utils";

const About = () => {
	const quickTipsRef = useRef(null);
	const [quickTip, setQuickTip] = useState(randomElement(QUICK_TIP_LIST));

	const nextTip = () => {
		setQuickTip((prevTip) => {
			const index = QUICK_TIP_LIST.indexOf(prevTip);
			return index === QUICK_TIP_LIST.length - 1
				? QUICK_TIP_LIST[0]
				: QUICK_TIP_LIST[index + 1];
		});
		addRefClassName(quickTipsRef, FADEIN);
		setTimeout(() => removeRefClassName(quickTipsRef, FADEIN), 500);
	};

	return (
		<div id="settings-help" className="settings-view settings-help">
			<h3>Help</h3>

			<h5>QUICK TIPS</h5>
			<div className="quick-tips-wrapper">
				<div className="quick-tips" ref={quickTipsRef}>
					{quickTip}
				</div>
				<button className="next-quick-tip button" onClick={nextTip}>
					Next tip
				</button>
			</div>
		</div>
	);
};

export default About;
