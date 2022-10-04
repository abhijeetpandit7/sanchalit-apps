import React from "react";
import { SwitchNavWrapper } from "../../components";

export const Focus = () => {
	return (
		<div className="focuses app-container">
			<div className="focus-wrapper has-dash-icon clock-view">
				<div className="has-3-col focus-prompt-wrapper" data-v-d6260d64>
					<div className="side-col left">
						<SwitchNavWrapper />
					</div>
					<div className="center-col">
						<div className="prompt">
							<h3 className="focus-question" data-v-1463c36e>
								What is your main focus for today?
							</h3>
							<span className="hidden-data">&nbsp;</span>
							<input type="text" autoComplete="off" className="focus-input" />
						</div>
					</div>
					<div className="side-col right"></div>
				</div>
			</div>
			<div className="focus-message-wrapper">
				<div className="message focus-message">
					<span>&nbsp;</span>
				</div>
			</div>
		</div>
	);
};
