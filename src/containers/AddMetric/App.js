import React from "react";
import { COUNTDOWNS, POPUP, countdownIcon } from "../../utils";

const App = ({ setDashApp }) => {
	
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
				onClick={() => setDashApp(COUNTDOWNS)}
				data-v-76a7e140
				data-v-6eb8778d
			>
				{countdownIcon}
				<div className="widget-name" data-v-76a7e140 data-v-6eb8778d>
					Countdown
				</div>
        {/* TODO: Show if not plus user */}
				{/* <span className="badge badge-plus" data-v-76a7e140 data-v-6eb8778d>
					Plus
				</span> */}
			</div>
		</div>
	</div>
)};

export default App;
