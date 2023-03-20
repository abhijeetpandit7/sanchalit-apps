import React, { memo, useEffect, useState } from "react";
import { MoreToggleWrapper2 } from "../../../../../components";
import { useUserActions, useUserCustomization } from "../../../../../hooks";
import {
	ACTIVE,
	AM,
	HOME,
	ON,
	PM,
	archiveIcon,
	backIcon1,
	trashIcon1,
	unarchiveIcon,
	getDaysInMonth,
	getDateFromToday,
	getMonthNames,
	precedeZero,
	toHourFormat,
} from "../../../../../utils";

const Month = ({ month, monthNames, setMonth }) => (
	<div className="select-wrapper month-group" data-v-59dbdd92>
		<select
			id="month"
			className="month"
			name="month"
			value={month}
			onChange={(event) => setMonth(event.target.value)}
			data-v-59dbdd92
		>
			{[...monthNames].map((monthName) => (
				<option value={monthName} key={monthName} data-v-59dbdd92>
					{monthName}
				</option>
			))}
		</select>
	</div>
);

const Day = ({ day, daysInMonth, setDay }) => (
	<div className="select-wrapper day-group" data-v-59dbdd92>
		<select
			id="day"
			className="day"
			name="day"
			value={day}
			onChange={(event) => setDay(event.target.value)}
			data-v-59dbdd92
		>
			{[...Array(daysInMonth).keys()].map((day) => (
				<option value={day + 1} key={day} data-v-59dbdd92>
					{day + 1}
				</option>
			))}
		</select>
	</div>
);

const Year = ({ currentYear, year, setYear }) => (
	<div className="select-wrapper year-group" data-v-59dbdd92>
		<select
			id="year"
			className="year"
			name="year"
			value={year}
			onChange={(event) => setYear(event.target.value)}
			data-v-59dbdd92
		>
			{/* TODO: Previous & future year handler */}
			{[...Array(5).keys()].map((i) => (
				<option value={currentYear + i} key={i} data-v-59dbdd92>
					{currentYear + i}
				</option>
			))}
		</select>
	</div>
);

const Time = ({
	hour,
	hour12clock,
	minute,
	timePeriod,
	setHour,
	setMinute,
	timePeriodChangeHandler,
}) => (
	<div className="resize-wrapper tr-height" data-v-0f8972b1 data-v-a966943c>
		<div data-v-0f8972b1>
			<div className="option-wrapper form-row" data-v-59dbdd92 data-v-0f8972b1>
				<div className="option-form add-time-wrapper" data-v-59dbdd92>
					<div className="add-time-group" data-v-59dbdd92>
						<div className="select-wrapper select-hour" data-v-59dbdd92>
							<select
								id="hour"
								name="hour"
								value={hour}
								onChange={(event) => setHour(event.target.value)}
								data-v-59dbdd92
							>
								{[...Array(hour12clock ? 12 : 24).keys()].map((hour) => (
									<option
										value={hour12clock ? hour + 1 : hour}
										key={hour}
										data-v-59dbdd92
									>
										{precedeZero(hour12clock ? hour + 1 : hour)}
									</option>
								))}
							</select>
						</div>
						<span className="hour-punctuation" data-v-59dbdd92>
							:
						</span>
						<div className="select-wrapper" data-v-59dbdd92>
							<select
								id="minute"
								name="minute"
								value={minute}
								onChange={(event) => setMinute(event.target.value)}
								data-v-59dbdd92
							>
								{[...Array(60).keys()].map((minute) => (
									<option value={minute} key={minute} data-v-59dbdd92>
										{precedeZero(minute)}
									</option>
								))}
							</select>
						</div>
						{hour12clock && (
							<div className="select-wrapper period" data-v-59dbdd92>
								<select
									id="period"
									name="period"
									value={timePeriod}
									onChange={timePeriodChangeHandler}
									data-v-59dbdd92
								>
									{[AM, PM].map((period) => (
										<option value={period} key={period} data-v-59dbdd92>
											{period}
										</option>
									))}
								</select>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
);

const ContextMemo = memo(
	({
		currentCountdownId,
		edit,
		hour12clock,
		countdowns,
		createNewCountdown,
		deleteCountdown,
		saveCountdown,
		setActiveView,
		toggleArchiveCountdown,
	}) => {
		const monthNames = getMonthNames();
		let defaultDate = getDateFromToday(7);
		const currentYear = new Date().getFullYear();

		const [name, setName] = useState("");
		const [date, setDate] = useState("");
		const [day, setDay] = useState("");
		const [month, setMonth] = useState("");
		const [year, setYear] = useState("");
		const [hour, setHour] = useState(9);
		const [minute, setMinute] = useState(0);
		const [timePeriod, setTimePeriod] = useState(AM);
		const [showTime, setShowTime] = useState(false);
		const [archived, setArchived] = useState(false);
		const [pinned, setPinned] = useState(false);

		const daysInMonth = getDaysInMonth(monthNames.indexOf(month), year);

		useEffect(() => {
			if (edit) {
				const currentCountdown = countdowns.find(
					(countdown) => countdown.id === currentCountdownId,
				);
				defaultDate = new Date(currentCountdown.dueDate);
				const dueDateTimePeriod = defaultDate.getHours() > 12 ? PM : AM;
				setName(currentCountdown.name);
				setArchived(currentCountdown.archived);
				setPinned(currentCountdown.pinned);
				if (currentCountdown.hasHours) {
					setShowTime(true);
					setHour(toHourFormat(defaultDate.getHours(), hour12clock));
					setMinute(defaultDate.getMinutes());
					if (hour12clock) {
						setTimePeriod(dueDateTimePeriod);
					}
				}
			}
			setDay(defaultDate.getDate());
			setMonth(monthNames[defaultDate.getMonth()]);
			setYear(defaultDate.getFullYear());
		}, []);

		useEffect(
			() =>
				setDate(
					new Date(
						year,
						monthNames.indexOf(month),
						day,
						toHourFormat(hour, false, hour12clock ? timePeriod : null),
						minute,
					),
				),
			[day, month, year, hour, minute, timePeriod],
		);

		const nameChangeHandler = (event) => setName(event.target.value);

		const timePeriodChangeHandler = (event) =>
			setTimePeriod(event.target.value);

		const onClick = async () => {
			if (name === "") return;
			if (edit) {
				// TODO: Callback only if changed something
				await saveCountdown(currentCountdownId, name, date, showTime, pinned);
			} else {
				await createNewCountdown(name, date, showTime, pinned);
			}
			setActiveView(HOME);
		};

		return (
			<>
				<div className="app-overflow" data-v-d653fa6c data-v-0f8972b1>
					<header
						className="header app-header center-title"
						data-v-53b21e9c
						data-v-d653fa6c
					>
						<div
							className="buttons header-left"
							onClick={() => setActiveView(HOME)}
							data-v-57e867a2
							data-v-53b21e9c
						>
							<div data-v-57e867a2>
								<div className="icon-wrapper go-back" data-v-57e867a2>
									{backIcon1}
								</div>
							</div>
						</div>
						<div className="header-center" data-v-53b21e9c>
							<div className="title-wrapper" data-v-53b21e9c>
								<div className="title" data-v-53b21e9c>
									{edit ? "Edit" : "Add"} countdown
								</div>
							</div>
						</div>
						{edit ? (
							<div className="header-right" data-v-53b21e9c>
								<div className="buttons" data-v-57e867a2 data-v-53b21e9c>
									<div data-v-57e867a2>
										<MoreToggleWrapper2>
											<ul className="dropdown dropdown-list" data-v-407a49db>
												<li
													onClick={() => {
														toggleArchiveCountdown(currentCountdownId);
														setActiveView(HOME);
													}}
													data-v-407a49db
												>
													<div className="dropdown-list-item" data-v-407a49db>
														{archived ? unarchiveIcon : archiveIcon}
														<span data-v-407a49db>
															{archived ? "Unarchive" : "Archive"}
														</span>
													</div>
												</li>

												<li
													onClick={() => {
														deleteCountdown(currentCountdownId);
														setActiveView(HOME);
													}}
													data-v-407a49db
												>
													<div className="dropdown-list-item" data-v-407a49db>
														{trashIcon1}
														<span data-v-407a49db>Delete</span>
													</div>
												</li>
											</ul>
										</MoreToggleWrapper2>
									</div>
								</div>
							</div>
						) : (
							<div className="centering-placeholder" data-v-53b21e9c></div>
						)}
					</header>
					<div className="app-body" data-v-d653fa6c>
						<div className="view" data-v-3db61620 data-v-d653fa6c>
							<div className="edit-form" data-v-3db61620>
								<div
									className="form-row item-body"
									data-v-25a5017e
									data-v-3db61620
								>
									<label data-v-25a5017e>Name</label>
									<div className="input-wrapper" data-v-25a5017e>
										<input
											name="name"
											type="text"
											autoCapitalize="on"
											autoCorrect="on"
											autoComplete="off"
											value={name}
											onChange={nameChangeHandler}
											data-v-25a5017e
										/>
									</div>
								</div>
								<div className="form-row" data-v-25a5017e data-v-3db61620>
									<div data-v-59dbdd92 data-v-25a5017e>
										<div className="date-row" data-v-59dbdd92>
											<label data-v-59dbdd92>Date</label>
											<Month {...{ month, monthNames, setMonth }} />
											<Day {...{ day, daysInMonth, setDay }} />
											{/* TODO: Add custom year */}
											{/* other-active */}
											<Year {...{ currentYear, year, setYear }} />
											{/* <input
												id="countdown-year-other"
												className="countdown-year-other"
												name="countdown-year-other"
												type="text"
												placeholder="yyyy"
												maxlength="4"
												data-v-59dbdd92
											/> */}
										</div>
										<div data-v-a966943c data-v-59dbdd92>
											<div
												className="label-row"
												data-v-a966943c
												onClick={() => setShowTime((prevValue) => !prevValue)}
											>
												<label data-v-a966943c>Time</label>
												<span
													className={`x-caret ${showTime ? ACTIVE : ""}`}
													data-v-a966943c
												>
													<svg
														className="icon x-caret-left"
														data-v-a966943c
														viewBox="0 0 52.16 11.75"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															xmlns="http://www.w3.org/2000/svg"
															d="M52.16,26.08A5.87,5.87,0,0,1,46.29,32H5.88A5.88,5.88,0,0,1,0,26.08H0a5.87,5.87,0,0,1,5.88-5.87H46.29a5.87,5.87,0,0,1,5.87,5.87Z"
															transform="translate(0 -20.21)"
														></path>
													</svg>
													<svg
														className="icon x-caret-right"
														data-v-a966943c
														viewBox="0 0 52.16 11.75"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															xmlns="http://www.w3.org/2000/svg"
															d="M52.16,26.08A5.87,5.87,0,0,1,46.29,32H5.88A5.88,5.88,0,0,1,0,26.08H0a5.87,5.87,0,0,1,5.88-5.87H46.29a5.87,5.87,0,0,1,5.87,5.87Z"
															transform="translate(0 -20.21)"
														></path>
													</svg>
												</span>
											</div>
											{showTime && (
												<Time
													{...{
														hour,
														hour12clock,
														minute,
														timePeriod,
														setHour,
														setMinute,
														timePeriodChangeHandler,
													}}
												/>
											)}
										</div>
									</div>
								</div>
								<div className="form-row" data-v-25a5017e data-v-3db61620>
									<div
										className="switch-click in-form"
										name="pinned"
										data-v-c03af454
										data-v-25a5017e
										onClick={() => setPinned((prevValue) => !prevValue)}
									>
										<span className="switch-label" data-v-c03af454>
											Pin to dashboard
										</span>
										<div
											className={`switch ${pinned ? ON : ""}`}
											data-v-c03af454
										></div>
									</div>
								</div>
								<div className="save-button-container" data-v-3db61620>
									<button
										className="button button-primary button-save"
										onClick={onClick}
										data-v-3db61620
									>
										{edit ? "Save" : "Add"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	},
);

const Add = ({ edit, setActiveView }) => {
	const {
		storageUserCustomization: { hour12clock, countdowns },
		widgetManager,
	} = useUserCustomization();
	const {
		createNewCountdown,
		deleteCountdown,
		saveCountdown,
		toggleArchiveCountdown,
	} = useUserActions();

	const { currentCountdownId } = widgetManager.dashApp;

	return (
		<ContextMemo
			{...{
				currentCountdownId,
				edit,
				hour12clock,
				countdowns,
				createNewCountdown,
				deleteCountdown,
				saveCountdown,
				setActiveView,
				toggleArchiveCountdown,
			}}
		/>
	);
};

export default Add;
