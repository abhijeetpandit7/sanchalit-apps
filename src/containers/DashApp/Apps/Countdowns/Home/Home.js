import React, { useEffect, useState } from "react";
import {
	ACTIVE,
	ADD,
	ONE_SECOND,
	countdownIcon1,
	ellipsisIcon1,
	gearIcon,
	pinIcon,
	plusIcon,
	getDateFullFormat,
	getTimeDifferenceFormat,
	toMilliseconds,
} from "../../../../../utils";

const NoCountdownsYet = ({ setActiveView }) => (
	<section className="empty" data-v-16d4966f data-v-b9a9e05a>
		<ul className="list" data-v-16d4966f>
			<li className="list-row" data-v-16d4966f></li>
			<li className="list-row" data-v-16d4966f></li>
			<li className="list-row" data-v-16d4966f></li>
		</ul>
		<div className="content" data-v-16d4966f>
			<div className="title" data-v-16d4966f>
				No countdowns yet
			</div>
			<div className="description" data-v-16d4966f>
				Add a countdown to get started
			</div>
			<button
				className="button"
				onClick={() => setActiveView(ADD)}
				data-v-16d4966f
			>
				+ Add Countdown
			</button>
		</div>
	</section>
);

const CountdownItem = ({ name, dueDate, hasHours, pinned }) => {
	const [timeDifference, setTimeDifference] = useState(0);

	useEffect(() => {
		setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		setInterval(() => {
			setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		}, toMilliseconds(ONE_SECOND));
	}, [dueDate]);

	return (
		<li
			className="list-row"
			title={getDateFullFormat(dueDate)}
			data-v-00432268
			data-v-b9a9e05a
		>
			<div className="title-container" data-v-00432268>
				<div className="metric-stat" data-v-00432268>
					{timeDifference}
				</div>
				<div className="list-icons" data-v-00432268>
					<div className="icon-wrapper edit" data-v-00432268 title="Edit">
						{gearIcon}
					</div>
					<div
						className={`icon-wrapper pin ${pinned ? ACTIVE : ""}`}
						data-v-00432268
						title={pinned ? "Unpin" : "Pin"}
					>
						{pinIcon}
					</div>
				</div>
			</div>
			<div className="metric-label" data-v-00432268>
				<div className="metric-label-name" data-v-00432268>
					{name}
				</div>
			</div>
		</li>
	);
};

const Home = ({ countdowns, setActiveView }) => {
	return (
		<>
			<header className="header app-header" data-v-53b21e9c data-v-d653fa6c>
				<div className="header-center" data-v-53b21e9c>
					<div className="title-wrapper" data-v-53b21e9c>
						{countdownIcon1}
						<div className="title" data-v-53b21e9c>
							Countdowns
						</div>
					</div>
				</div>
				<div className="header-right" data-v-53b21e9c>
					<div className="buttons" data-v-57e867a2 data-v-53b21e9c>
						<div data-v-57e867a2 onClick={() => setActiveView(ADD)}>
							<div className="icon-wrapper add" data-v-57e867a2>
								{plusIcon}
							</div>
						</div>
						<div data-v-57e867a2>
							<div className="dropdown-wrapper" data-v-407a49db data-v-57e867a2>
								<div className="icon-wrapper more-toggle" data-v-407a49db>
									{ellipsisIcon1}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div className="app-body" data-v-d653fa6c>
				<div className="box-wrapper view" data-v-b9a9e05a data-v-d653fa6c>
					<div className="items-filter" data-v-b9a9e05a>
						{countdowns.length ? (
							<ul className="list" data-v-b9a9e05a>
								{countdowns.map((countdown) => (
									<CountdownItem {...countdown} key={countdown.id} />
								))}
							</ul>
						) : (
							<NoCountdownsYet {...{ setActiveView }} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
