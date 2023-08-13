import React from "react";
import {
	COUNTDOWNS,
	POPUP,
	UPSELL_PLUS_GATE,
	countdownIcon,
} from "../../utils";

const App = ({ hasPlus, setDashApp, setUpsellApp }) => {
	const handleClick = () => {
		if (hasPlus) {
			setDashApp(COUNTDOWNS);
		} else {
			setUpsellApp(UPSELL_PLUS_GATE);
		}
	};

	return (
		<div
			className={`app app-wrapper display-bottom nipple ${POPUP}`}
			data-v-6eb8778d
			data-v-76a7e140
		>
			<div className="title-wrapper" data-v-76a7e140 data-v-6eb8778d>
				<div className="title" data-v-76a7e140 data-v-6eb8778d>
					Add metric
				</div>
				<div className="description" data-v-76a7e140 data-v-6eb8778d>
					Keep track of important info.
				</div>
			</div>
			<div className="tiles" data-v-76a7e140 data-v-6eb8778d>
				<div
					className="tile"
					onClick={handleClick}
					data-v-76a7e140
					data-v-6eb8778d
				>
					{countdownIcon}
					<div className="widget-name" data-v-76a7e140 data-v-6eb8778d>
						Countdown
					</div>
					{hasPlus === false && (
						<span className="badge badge-plus" data-v-76a7e140 data-v-6eb8778d>
							Plus
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
