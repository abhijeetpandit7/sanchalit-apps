import React from "react";
import moment from "moment";
import _ from "lodash";
import { EMPTY_NAME, OPEN, SHOW, SHOW_FADE_IN } from "../utils";

export const addRefClassName = (ref, className) =>
	ref.current.classList.add(className);

export const focusDisplayName = (displayNameRef) => {
	const element = displayNameRef.current;
	if (element.innerText === EMPTY_NAME) element.innerText = "";
	const setpos = document.createRange();
	const set = window.getSelection();
	if (element.childNodes[0])
		setpos.setStart(element.childNodes[0], element.innerText.length);
	setpos.collapse(true);
	set.removeAllRanges();
	set.addRange(setpos);
	element.focus();
};

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

export const getClockTime = ({ hour12clock = true } = {}) =>
	hour12clock ? moment().format("h:mm") : moment().format("HH:mm");

export const getGreetingMessage = (userNameVisible, userName) => {
	const dayPeriod = getDayPeriod();
	if (userNameVisible && userName) return `Good ${dayPeriod}, `;
	else return `Good ${dayPeriod}`;
};

export const getLocalStorageItem = (key) => localStorage.getItem(key);

export const hideAppPopup = (appRef) =>
	(appRef.current.classList.contains(SHOW) ||
		appRef.current.classList.contains(SHOW_FADE_IN)) &&
	toggleAppPopup(appRef);

export const hideUserNav = (ref) =>
	ref.current.classList.contains(OPEN) && toggleRefClassName(ref, OPEN);

export const isObjectEmpty = (obj) => (_.isObject(obj) ? _.isEmpty(obj) : true);

export const removeRefClassName = (ref, className) =>
	ref.current.classList.remove(className);

export const setLocalStorageItem = (key, value) =>
	localStorage.setItem(key, value);

export const toCSSUrl = (link) => `url("${link}")`;

export const toggleAppPopup = (appRef) => {
	toggleRefClassName(appRef, SHOW);
	toggleRefClassName(appRef, SHOW_FADE_IN);
};

export const toggleRefClassName = (ref, className) =>
	ref.current.classList.toggle(className);

export const toMilliseconds = (seconds) => seconds * 1000;
