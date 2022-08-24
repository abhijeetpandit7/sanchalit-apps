import React from "react";
import moment from "moment";
import { OPEN, SHOW, SHOW_FADE_IN } from "../utils";

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

export const hideAppPopup = (appRef) =>
	(appRef.current.classList.contains(SHOW) ||
		appRef.current.classList.contains(SHOW_FADE_IN)) &&
	toggleAppPopup(appRef);

export const removeRefClassName = (ref, className) =>
	ref.current.classList.remove(className);

export const toCSSUrl = (link) => `url("${link}")`;

export const toggleAppPopup = (appRef) => {
	toggleRefClassName(appRef, SHOW);
	toggleRefClassName(appRef, SHOW_FADE_IN);
};

export const toggleRefClassName = (ref, className) =>
	ref.current.classList.toggle(className);

export const toMilliseconds = (seconds) => seconds * 1000;
