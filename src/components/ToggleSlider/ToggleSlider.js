import React from "react";
import { ON, toggleSwitch } from "../../utils";

export const ToggleSlider = (props) => {
	const Plus = () =>
		props.plus ? <span className="badge badge-plus">PLUS</span> : null;
	const Preview = () =>
		props.preview ? <span className="badge badge-plus">PREVIEW</span> : null;
	const Message = () =>
		props.message ? (
			<span className="option-message">{props.message}</span>
		) : null;

	return (
		<li className={`slide-toggle has-toggle ${props.value ? ON : ""}`}>
			<span className="setting-name">{props.name}</span>
			<Plus />
			<Preview />
			<span className="toggle-slider" onClick={props.toggle}>
				{toggleSwitch}
			</span>
			<Message />
		</li>
	);
};
