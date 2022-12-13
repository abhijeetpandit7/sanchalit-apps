import React, { memo, useEffect, useState } from "react";
import { MoreToggleWrapper2 } from "../../../../../components";
import { useUserActions, useUserCustomization } from "../../../../../hooks";
import {
	ACTIVE,
	ADD,
	EDIT,
	ON,
	ONE_SECOND,
	archiveIcon,
	countdownIcon1,
	gearIcon,
	pinIcon,
	plusIcon,
	getDateFullFormat,
	getSortedCountdowns,
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

const CountdownItem = ({
	id,
	name,
	dueDate,
	hasHours,
	pinned,
	setActiveView,
	setCurrentCountdownId,
	toggleCountdownPin,
}) => {
	const [timeDifference, setTimeDifference] = useState(0);

	useEffect(() => {
		setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		const timeInterval = setInterval(() => {
			setTimeDifference(getTimeDifferenceFormat(dueDate, hasHours));
		}, toMilliseconds(ONE_SECOND));
		return () => clearInterval(timeInterval);
	}, [dueDate]);

	const editCountdown = () => {
		setCurrentCountdownId(id);
		setActiveView(EDIT);
	};

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
					<div
						className="icon-wrapper edit"
						onClick={editCountdown}
						title="Edit"
						data-v-00432268
					>
						{gearIcon}
					</div>
					<div
						className={`icon-wrapper pin ${pinned ? ACTIVE : ""}`}
						title={pinned ? "Unpin" : "Pin"}
						onClick={() => toggleCountdownPin(id, pinned)}
						data-v-00432268
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

const ContextMemo = memo(
	({
		countdowns,
		showRandomMetricCountdown,
		setActiveView,
		setCurrentCountdownId,
		toggleCountdownPin,
		toggleRandomMetricCountdown,
	}) => {
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
							<div onClick={() => setActiveView(ADD)} data-v-57e867a2>
								<div className="icon-wrapper add" data-v-57e867a2>
									{plusIcon}
								</div>
							</div>
							<div data-v-57e867a2>
								<MoreToggleWrapper2>
									<ul className="dropdown dropdown-list" data-v-407a49db>
										<li data-v-407a49db>
											<div className="dropdown-list-item" data-v-407a49db>
												{archiveIcon}
												<span data-v-407a49db>Show Archived</span>
											</div>
										</li>
										<li data-v-407a49db>
											<div
												className="switch-click dropdown-list-item"
												onClick={toggleRandomMetricCountdown}
												data-v-c03af454
												data-v-407a49db
											>
												<span className="switch-label" data-v-c03af454>
													Show Random
												</span>
												<div
													className={`switch ${
														showRandomMetricCountdown ? ON : ""
													}`}
													data-v-c03af454
												></div>
											</div>
										</li>
									</ul>
								</MoreToggleWrapper2>
							</div>
						</div>
					</div>
				</header>
				<div className="app-body" data-v-d653fa6c>
					<div className="box-wrapper view" data-v-b9a9e05a data-v-d653fa6c>
						<div className="items-filter" data-v-b9a9e05a>
							{countdowns.length ? (
								<ul className="list" data-v-b9a9e05a>
									{getSortedCountdowns(countdowns).map((countdown) => (
										<CountdownItem
											{...{
												...countdown,
												setActiveView,
												setCurrentCountdownId,
												toggleCountdownPin,
											}}
											key={countdown.id}
										/>
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
	},
);

const Home = ({ setActiveView }) => {
	const {
		storageUserCustomization: { countdowns, showRandomMetricCountdown },
	} = useUserCustomization();
	const {
		setCurrentCountdownId,
		toggleCountdownPin,
		toggleRandomMetricCountdown,
	} = useUserActions();

	return (
		<ContextMemo
			{...{
				countdowns,
				showRandomMetricCountdown,
				setActiveView,
				setCurrentCountdownId,
				toggleCountdownPin,
				toggleRandomMetricCountdown,
			}}
		/>
	);
};

export default Home;
