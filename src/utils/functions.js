import React from "react";
import moment from "moment";

const getDayPeriod = () => {
	const currentHour = moment().get("hour");
	if (currentHour < 12) {
		return "morning";
	} else if (currentHour < 17) {
		return "afternoon";
	} else {
		return "evening";
	}
};

export const getClockTime = ({ hour12clock }) =>
	hour12clock ? moment().format("h:mm") : moment().format("HH:mm");

export const getGreetingMessage = (userName) => {
	const dayPeriod = getDayPeriod();
	return userName ? `Good ${dayPeriod}, ` : `Good ${dayPeriod}`;
};

export const removeRefClassName = (ref, className) =>
	ref.current.classList.remove(className);

export const toCSSUrl = (link) => `url("${link}")`;

export const toMilliseconds = (seconds) => seconds * 1000;
