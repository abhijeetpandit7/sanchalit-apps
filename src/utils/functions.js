import React from "react";
import moment from "moment";
import _ from "lodash";
import {
	ACTIVE,
	EMPTY_NAME,
	FOLDER_DROPDOWN,
	OPEN,
	OVERFLOW,
	PARENT_ID,
	SHIFT_TO_LEFT,
	SHOW,
	SHOW_FADE_IN,
} from "../utils";

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

export const getBookmarks = async (bookmarksSettings) => {
	const bookmarksTree = await new Promise((resolve, reject) =>
		chrome.bookmarks.getTree((bookmarks) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(bookmarks),
		),
	);
	const bookmarks = bookmarksSettings.includeOtherBookmarks
		? bookmarksTree[0]
		: bookmarksTree[0].children[0].children;
	return bookmarks;
};

export const getPermissionAllowed = (permission) =>
	new Promise((resolve, reject) =>
		chrome.permissions.contains({ permissions: [permission] }, (allowed) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(allowed),
		),
	);

export const hideAppPopup = (appRef) =>
	(appRef.current.classList.contains(SHOW) ||
		appRef.current.classList.contains(SHOW_FADE_IN)) &&
	toggleAppPopup(appRef);

export const hideBookmarkFolder = (appRef) =>
	appRef.current.classList.contains(ACTIVE) && toggleBookmarkFolder(appRef);

export const hideUserNav = (ref) =>
	ref.current.classList.contains(OPEN) && toggleRefClassName(ref, OPEN);

export const isBookmarkDropdownOverflowing = (bookmarksListRef) => {
	const folderDropdown = bookmarksListRef.current.querySelector(
		`.${FOLDER_DROPDOWN}`,
	);
	const availableWidth =
		bookmarksListRef.current.offsetParent.offsetParent.offsetWidth;
	const folderDropdownWidth = folderDropdown.offsetWidth;
	const bookmarkFolderOffsetLeft = folderDropdown.offsetParent.offsetLeft;
	const isOverflowing =
		availableWidth < bookmarkFolderOffsetLeft + folderDropdownWidth;
	return isOverflowing;
};

export const isObjectEmpty = (obj) => (_.isObject(obj) ? _.isEmpty(obj) : true);

export const parseBookmarksListOverflow = (bookmarksList, bookmarksListRef) => {
	const availableWidth = bookmarksListRef.current.offsetWidth;
	const totalContentWidth = bookmarksListRef.current.scrollWidth;
	const isOverflowing = totalContentWidth > availableWidth;

	if (isOverflowing) {
		bookmarksList.map(
			(bookmark) =>
				(bookmark.width = bookmarksListRef.current.querySelector(
					`[id='${bookmark.id}']`,
				).offsetWidth),
		);

		const mapBookmarkChildOverflow = (bookmark) => {
			bookmark.parentOverflow = true;
			if (bookmark.children)
				bookmark.children.map((child) => mapBookmarkChildOverflow(child));
		};

		const reducedBookmarksList = bookmarksList.reduce(
			(bookmarksListAcc, bookmark) => {
				const bookmarksListAccWidth = bookmarksListAcc.reduce(
					(totalWidth, bookmark) => totalWidth + bookmark.width,
					0,
				);

				if (bookmarksListAccWidth + bookmark.width < availableWidth)
					return [...bookmarksListAcc, bookmark];
				else {
					mapBookmarkChildOverflow(bookmark);
					bookmarksListAcc
						.find((bookmark) => bookmark.id === OVERFLOW)
						.children.push(bookmark);
					return [...bookmarksListAcc];
				}
			},
			[
				{
					id: OVERFLOW,
					parentId: PARENT_ID,
					title: OVERFLOW,
					width: 30,
					children: [],
				},
			],
		);

		reducedBookmarksList.push(reducedBookmarksList.shift());
		return reducedBookmarksList;
	} else return bookmarksList;
};

export const removeRefClassName = (ref, className) =>
	ref.current.classList.remove(className);

export const requestPermission = (permssion) =>
	new Promise((resolve, reject) =>
		chrome.permissions.request({ permissions: [permssion] }, (granted) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(granted),
		),
	);

export const setLocalStorageItem = (key, value) =>
	localStorage.setItem(key, value);

export const toCSSUrl = (link) => `url("${link}")`;

export const toggleAppPopup = (appRef) => {
	toggleRefClassName(appRef, SHOW);
	toggleRefClassName(appRef, SHOW_FADE_IN);
};

export const toggleBookmarkFolder = (appRef, ignoreOverflow) => {
	toggleRefClassName(appRef, ACTIVE);
	if (ignoreOverflow === false)
		if (isBookmarkDropdownOverflowing(appRef))
			addRefClassName(appRef, SHIFT_TO_LEFT);
};

export const toggleRefClassName = (ref, className) =>
	ref.current.classList.toggle(className);

export const toMilliseconds = (seconds) => seconds * 1000;
