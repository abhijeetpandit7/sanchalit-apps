import React from "react";
import { ACTIVE } from "../../utils";

export const ToggleOptions = (props) => {
	const Plus = () =>
		props.plus ? <span className="badge badge-plus">PLUS</span> : null;
	const Divider = () => <span className="toggle-divider">|</span>;

	return (
		<li className="has-toggle has-toggle-options bookmark-option">
			<span className="setting-name">{props.name}</span>
			<Plus />
			<span className="toggle-options">
				{props.options.map((option, index) => (
					<span key={option.key}>
						<span
							className={`toggle-option special-link-option ${
								option.key === props.value ? ACTIVE : ""
							}`}
							onClick={() => props.toggle({ ...props, newValue: option.key })}
						>
							<span className="toggle-label">{option.name}</span>
						</span>
						{index !== props.options.length - 1 ? <Divider /> : null}
					</span>
				))}
			</span>
		</li>
	);
};
