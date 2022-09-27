import React from "react";
import { DISABLED, ON, toggleSwitch } from "../../utils";

export const ToggleSlider = (props) => {
	const Plus = () =>
		props.plus ? <span className="badge badge-plus">PLUS</span> : null;
	const Preview = () =>
		props.preview ? <span className="badge badge-plus">PREVIEW</span> : null;
	const Description = () =>
		props.description ? (
			<span className="option-message">{props.description}</span>
		) : null;
	const Unsupported = () =>
		props.unsupported ? (
			<span className="unsupported">
				This feature is not yet supported on your current browser
			</span>
		) : null;

	return (
		<li
			className={`slide-toggle has-toggle ${props.value ? ON : ""} ${
				props.unsupported ? DISABLED : ""
			}`}
			onClick={props.unsupported !== true ? props.toggle : null}
		>
			<span className="setting-name">{props.name}</span>
			<Plus />
			<Preview />
			<span className="toggle-slider">{toggleSwitch}</span>
			<Description />
			<Unsupported />
		</li>
	);
};
