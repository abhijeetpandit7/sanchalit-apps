import React, { Fragment } from "react";
import { ACTIVE } from "../../utils";

export const ToggleOptions = (props) => {
	const Plus = () =>
		props.plusOnly ? <span className="badge badge-plus">PLUS</span> : null;
	const Divider = () => <span className="toggle-divider">|</span>;

	const optionBreakCount = 3;
	const totalOptions = props.options.length;
	const lastOptionIndex = totalOptions - 1;

	return (
		<li className="has-toggle has-toggle-options bookmark-option">
			<span className="setting-name">{props.name}</span>
			<Plus />
			<span className="toggle-options">
				{props.options.map((option, index) => (
					<Fragment key={option.key}>
						<span
							className={`toggle-option special-link-option ${
								option.key === props.value ? ACTIVE : ""
							}`}
							onClick={() => props.toggle({ ...props, newValue: option.key })}
						>
							<span className="toggle-label">{option.name}</span>
						</span>
						{index !== lastOptionIndex ? (
							totalOptions > optionBreakCount ? (
								index === optionBreakCount - 1 ? (
									<br />
								) : (
									<Divider />
								)
							) : (
								<Divider />
							)
						) : null}
					</Fragment>
				))}
			</span>
			<div className="option-clear"></div>
		</li>
	);
};
