import React from "react";
import moment from "moment";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
	_LEFT,
	_NIPPLE_DISPLACEMENT,
	_RIGHT,
	_TOP,
	_WIDTH,
	ACTIVE,
	AM,
	BOOKMARKS,
	BOOKMARK_ACTION_WIDTH,
	BOOKMARKS_BAR_ID,
	BOOKMARKS_BAR_FIREFOX_ID,
	CHROME,
	DISPLAY_LEFT,
	DISPLAY_RIGHT,
	EDGE,
	EMPTY_NAME,
	FIREFOX,
	FOLDER_DROPDOWN,
	FULLSCREEN,
	FULLSCREEN_TEXTAREA,
	HIDE_CONTENT,
	NIPPLE,
	NIPPLE_BOTTOM_RIGHT,
	NIPPLE_TOP_LEFT,
	NIPPLE_TOP_RIGHT,
	ONE_DAY,
	ONE_WEEK,
	OPEN,
	OVERFLOW,
	POPUP,
	SHOW_ANYWAY,
	SAFARI,
	SHIFT_TO_LEFT,
	SHOW,
	SHOW_FADE_IN,
	BROWSER_LIST,
	NOTE_DELIGHTER_LIST,
	THEME_COLOUR_OPTIONS,
	THEME_FONT_OPTIONS,
	APPS_OBJ,
	BOOKMARKS_MANAGER_OBJ,
	DASH_APP_STYLES,
	DEFAULT_COUNTDOWN_OBJ,
	DEFAULT_NOTE_OBJ,
	HOME_TAB_OBJ,
	OVERFLOW_FOLDER_OBJ,
	TOP_SITES_FOLDER_OBJ,
	chromeIcon,
	edgeIcon,
	appsBase64Source,
	bookmarksManagerBase64Source,
} from "../utils";

export const addRefClassName = (ref, className) =>
	ref.current.classList.add(className);

export const checkForMultiLineNote = (body) => {
	let e, i;
	return (
		!!(e =
			-1 != (i = body.indexOf("\n")) ? body.slice(i, body.length - 1) : null) &&
		-1 !== e.search(/[^\s]+/)
	);
};

export const createCountdown = () => {
	const newCountdown = _.cloneDeep(DEFAULT_COUNTDOWN_OBJ);
	newCountdown.id = uuidv4();
	return newCountdown;
};

export const createNote = () => {
	const newNote = _.cloneDeep(DEFAULT_NOTE_OBJ);
	newNote.id = uuidv4();
	return newNote;
};

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

export const focusNotesInput = (notesInputRef) => {
	const element = notesInputRef.current;
	element.setSelectionRange(element.value.length, element.value.length);
	element.focus();
};

export const formatDate = ({
	timestamp,
	hour12clock,
	relativeDay = false,
} = {}) => {
	const date = moment(timestamp);
	const dateIsInThisYear = date.isSame(moment(), "year");
	const dateDifference = date
		.startOf("day")
		.diff(moment().startOf("day"), "days");
	if (relativeDay) {
		switch (dateDifference) {
			case 0:
				return "Today";
			case 1:
				return "Tomorrow";
			case -1:
				return "Yesterday";
			default:
				const monthlyDayFormat = date.format("MMMM D");
				return dateIsInThisYear
					? monthlyDayFormat
					: formatYearRelative(monthlyDayFormat, timestamp);
		}
	} else {
		const dateIsToday = date.isSame(moment(), "day");
		const dateIsInLast7d = dateDifference > -7 && dateDifference < 0;
		const monthlyDayFormat = date.format("MMM D");

		if (dateIsToday) return formatTime({ timestamp, hour12clock });
		else if (dateIsInLast7d) return date.format("ddd");
		else if (dateIsInThisYear) return monthlyDayFormat;
		else return formatYearRelative(monthlyDayFormat, timestamp);
	}
};

const formatYearRelative = (dateFormat, timestamp) =>
	`${dateFormat}, ${moment(timestamp).get("year")}`;

export const formatTime = ({ timestamp, hour12clock }) => {
	const date = moment(timestamp);
	const currentHour = date.get("hour");
	const time = hour12clock ? date.format("h:mm") : date.format("HH:mm");
	return hour12clock ? `${time} ${currentHour >= 12 ? "PM" : "AM"}` : time;
};

export const getDashAppStyles = (metricRef, topRight) => {
	const BOOKMARKS_BAR_HEIGHT = 36;
	let dashAppStyles = {
		...DASH_APP_STYLES,
	};
	dashAppStyles[_WIDTH] = "230px";

	const metricOffsetTop =
		metricRef.current.offsetTop +
		metricRef.current.offsetParent.offsetParent.offsetParent.offsetTop;
	const metricHeight = metricRef.current.offsetHeight;
	const metricOffsetLeft =
		metricRef.current.offsetLeft +
		metricRef.current.offsetParent.offsetParent.offsetLeft;
	const metricWidth = metricRef.current.offsetWidth;
	const metricOffsetRight =
		window.innerWidth - (metricOffsetLeft + metricWidth);

	dashAppStyles[_NIPPLE_DISPLACEMENT] = `${topRight ? 9 : 33}px`;
	dashAppStyles[_TOP] = `${
		metricOffsetTop === 0
			? metricHeight
			: metricOffsetTop > BOOKMARKS_BAR_HEIGHT
			? metricHeight + metricOffsetTop
			: metricHeight
	}px`;
	dashAppStyles[_RIGHT] = `${metricOffsetRight}px`;

	return dashAppStyles;
};

export const getBodyPreview = (body) => {
	const bodyPreviewMaxLength = 150;
	const bodyTitle = getBodyTitle(body);
	return body.substr(bodyTitle.length, bodyPreviewMaxLength).trim();
};

export const getBodyTitle = (body) => {
	const titleLengthGuide = 60;
	let t, e, i;
	return (
		-1 !=
			(i = (t =
				-1 != (e = body.indexOf("\n")) ? body.slice(0, e) : body).indexOf(
				" ",
				titleLengthGuide - 1,
			)) && (t = t.slice(0, i)),
		t
	);
};

export const getDaysInMonth = (month, year) => {
	const date = moment([year, month]);
	const daysInMonth = date.daysInMonth();
	return daysInMonth || 0;
};

export const getDateFromToday = (numberOfDays) => {
	const date = moment();
	date.add(numberOfDays, "days");
	return new Date(date);
};

export const getDateFullFormat = (timestamp) =>
	moment(timestamp).format("ddd MMM D, YYYY");

export const getMonthNames = () => moment.monthsShort();

const getDayPeriod = () => {
	const currentHour = moment().get("hour");
	if (currentHour < 4) {
		return "evening";
	} else if (currentHour < 12) {
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

export const getBookmarks = () =>
	new Promise((resolve, reject) =>
		chrome.bookmarks.getTree((bookmarks) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(bookmarks[0].children),
		),
	);

export const getBrowserType = () => {
	const userDeviceDetails = navigator.userAgent;
	let chromeAgent = userDeviceDetails.indexOf(CHROME) > -1;
	let edgeAgent = userDeviceDetails.indexOf(EDGE.slice(0, 3)) > -1;
	let firefoxAgent = userDeviceDetails.indexOf(FIREFOX) > -1;
	let safariAgent = userDeviceDetails.indexOf(SAFARI) > -1;

	if (edgeAgent && chromeAgent) chromeAgent = false;
	if (chromeAgent && safariAgent) safariAgent = false;

	const browserName = chromeAgent
		? CHROME
		: edgeAgent
		? EDGE
		: firefoxAgent
		? FIREFOX
		: safariAgent
		? SAFARI
		: CHROME;
	const browserType = BROWSER_LIST.find(
		(browser) => browser.name === browserName,
	);
	return browserType;
};

export const getDaysDifference = (timestamp) =>
	moment(timestamp).diff(moment(), "days");

export const getPermissionAllowed = (permission) =>
	new Promise((resolve, reject) =>
		chrome.permissions.contains({ permissions: [permission] }, (allowed) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(allowed),
		),
	);

export const getRandomDelighter = () => randomElement(NOTE_DELIGHTER_LIST);

export const getRandomIntBetween = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

export const getSortedCountdowns = (
	archived,
	countdowns,
	showRandom,
	isDashApp,
) => {
	const archivedCountdowns = countdowns.filter(
		(countdown) => countdown.archived === true,
	);
	const unarchivedCountdowns = countdowns.filter(
		(countdown) => countdown.archived === false,
	);

	if (isDashApp) {
		const visibleCountdowns = unarchivedCountdowns.filter(
			(countdown) => countdown.pinned === true,
		);
		if (visibleCountdowns.length === 0 && unarchivedCountdowns.length) {
			const availableUnpinnedCountdowns = unarchivedCountdowns.filter(
				(countdown) => countdown.pinned === false,
			);
			const randomCountdown = {
				...randomElement(availableUnpinnedCountdowns),
				random: true,
			};
			visibleCountdowns.push(randomCountdown);
		} else if (showRandom) {
			const availableUnarchivedCountdowns = unarchivedCountdowns.filter(
				(countdown) => !visibleCountdowns.includes(countdown),
			);
			if (availableUnarchivedCountdowns.length) {
				const randomCountdown = {
					...randomElement(availableUnarchivedCountdowns),
					random: true,
				};
				visibleCountdowns.push(randomCountdown);
			}
		}
		visibleCountdowns.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
		return visibleCountdowns;
	} else if (archived) {
		archivedCountdowns.sort(
			(a, b) => new Date(a.dueDate) - new Date(b.dueDate),
		);
		archivedCountdowns.sort((a, b) => b.pinned - a.pinned);
		return archivedCountdowns;
	} else {
		unarchivedCountdowns.sort(
			(a, b) => new Date(a.dueDate) - new Date(b.dueDate),
		);
		unarchivedCountdowns.sort((a, b) => b.pinned - a.pinned);
		return unarchivedCountdowns;
	}
};

export const getTimeDifferenceFormat = (timestamp, hasHours) => {
	const date = moment(timestamp);
	if (hasHours) {
		const secondsDifference = date.diff(moment(), "seconds");
		const minuteDifference = date.diff(moment(), "minutes");
		const hourDifference = date.diff(moment(), "hours");
		const daysDifference = getDaysDifference(timestamp);
		if (minuteDifference === 0 && secondsDifference <= 0) return "Now";
		else if (minuteDifference < 0 && minuteDifference > -60)
			return `${-minuteDifference}m ago`;
		else if (
			minuteDifference === 0 ||
			(minuteDifference > 0 && minuteDifference < 59)
		)
			return `${minuteDifference + 1}m`;
		else if (hourDifference == 0) return `${hourDifference + 1}h`;
		else if (hourDifference < 0 && hourDifference > -24)
			return `${-hourDifference}h ago`;
		else if (hourDifference > 0 && hourDifference < 24)
			return `${hourDifference}h`;
		else
			return `${
				daysDifference < 0 ? `${-daysDifference}d ago` : `${daysDifference}d`
			}`;
	} else {
		const daysDifference = date
			.startOf("day")
			.diff(moment().startOf("day"), "days");
		if (daysDifference == 0) return "Today";
		else
			return `${
				daysDifference < 0 ? `${-daysDifference}d ago` : `${daysDifference}d`
			}`;
	}
};

export const getTopSites = () =>
	new Promise((resolve, reject) =>
		chrome.topSites.get((topSitesArray) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(topSitesArray),
		),
	);

export const hideAppPopup = (appRef) =>
	(appRef.current.classList.contains(SHOW) ||
		appRef.current.classList.contains(SHOW_FADE_IN)) &&
	toggleAppPopup(appRef);

export const hideBookmarkFolder = (appRef) =>
	appRef.current.classList.contains(ACTIVE) && toggleBookmarkFolder(appRef);

export const hideRefClassName = (appRef, classNames) => {
	const containsClass = classNames.some((className) =>
		appRef.current.classList.contains(className),
	);
	containsClass && toggleRefClassNames(appRef, classNames);
};

export const hideUserNav = (ref) =>
	ref.current.classList.contains(OPEN) && toggleRefClassName(ref, OPEN);

const isBookmarkDropdownOverflowing = (bookmarksListRef) => {
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

const isAppPopupOverflowing = (metricRef) => {
	const metricOffsetLeft =
		metricRef.current.offsetLeft +
		metricRef.current.offsetParent.offsetParent.offsetLeft;
	const metricWidth = metricRef.current.offsetWidth;
	const appPopup = metricRef.current.querySelector(`.${POPUP}`);
	const appPopupWidth = appPopup.offsetWidth;
	const isOverflowing = metricOffsetLeft + metricWidth < appPopupWidth;
	return isOverflowing;
};

export const isBoolean = (value) => typeof value === "boolean";

export const isObjectEmpty = (obj) => (_.isObject(obj) ? _.isEmpty(obj) : true);

export const parseAppPopupOverflow = (metricRef, topRight) => {
	const isOverflowing = isAppPopupOverflowing(metricRef);
	const appPopup = metricRef.current.querySelector(`.${POPUP}`);
	appPopup.classList.add(isOverflowing ? DISPLAY_RIGHT : DISPLAY_LEFT);
	appPopup.classList.add(isOverflowing ? NIPPLE_TOP_LEFT : NIPPLE_TOP_RIGHT);
	appPopup.style.setProperty(
		isOverflowing ? _LEFT : _RIGHT,
		`calc(50% - ${topRight ? 16 : 40}px)`,
	);
	appPopup.style.setProperty(_NIPPLE_DISPLACEMENT, `${topRight ? 9 : 33}px`);
};

export const parseBookmarksList = (
	allBookmarksList,
	bookmarksSettings,
	showMostVisited,
	topSites,
) => {
	const {
		includeOtherBookmarks,
		includeBookmarksManager,
		includeMostVisited,
		appsLocation,
		homeTabLocation,
	} = bookmarksSettings;

	const includeApps = appsLocation === BOOKMARKS;
	const includeHomeTab = homeTabLocation === BOOKMARKS;

	const bookmarksBar = allBookmarksList.find(
		(list) =>
			list.id === BOOKMARKS_BAR_ID || list.id === BOOKMARKS_BAR_FIREFOX_ID,
	);
	const otherBookmarksList = [...allBookmarksList].filter(
		(list) =>
			list.id !== BOOKMARKS_BAR_ID && list.id !== BOOKMARKS_BAR_FIREFOX_ID,
	);
	topSites.map((site, index) => (site.id = index));

	let topSitesFolder = TOP_SITES_FOLDER_OBJ;
	topSitesFolder.children = topSites;
	let homeTab = HOME_TAB_OBJ;
	if (includeHomeTab) {
		const browserType = getBrowserType().name;
		homeTab.title = `${browserType} Tab`;
		homeTab.svg = browserType === EDGE ? edgeIcon : chromeIcon;
	}
	let browserApp = APPS_OBJ;
	browserApp.imgSrc = appsBase64Source;
	let bookmarksManager = BOOKMARKS_MANAGER_OBJ;
	bookmarksManager.imgSrc = bookmarksManagerBase64Source;

	let bookmarks = [];
	if (showMostVisited) bookmarks = [...bookmarks, ...topSitesFolder.children];
	else {
		if (includeHomeTab) bookmarks.push(homeTab);
		if (includeApps) bookmarks.push(browserApp);
		if (includeBookmarksManager) bookmarks.push(bookmarksManager);
		if (includeMostVisited) bookmarks.push(topSitesFolder);
		bookmarks = [...bookmarks, ...bookmarksBar.children];
		if (includeOtherBookmarks) bookmarks.push(...otherBookmarksList);
	}
	return bookmarks;
};

export const parseBookmarksOverflow = (
	bookmarksList,
	showMostVisited,
	bookmarksListRef,
) => {
	const availableWidth = bookmarksListRef.current.offsetWidth;
	const totalContentWidth = bookmarksListRef.current.scrollWidth;
	const isOverflowing = totalContentWidth > availableWidth;

	if (isOverflowing) {
		let structuredBookmarksList = _.cloneDeep(bookmarksList);
		structuredBookmarksList.map(
			(bookmark) =>
				(bookmark.width = bookmarksListRef.current.querySelector(
					`[id='${bookmark.id}']`,
				).offsetWidth),
		);

		const mapBookmarkHierarchyOverflow = (bookmark) => {
			bookmark.parentHierarchyOverflow = true;
			if (bookmark.children)
				bookmark.children.map((child) => mapBookmarkHierarchyOverflow(child));
		};

		const reducedBookmarksList = structuredBookmarksList.reduce(
			(bookmarksListAcc, bookmark) => {
				const bookmarksListAccWidth = bookmarksListAcc.reduce(
					(totalWidth, bookmark) => totalWidth + bookmark.width,
					showMostVisited ? BOOKMARK_ACTION_WIDTH : 0,
				);

				if (bookmarksListAccWidth + bookmark.width < availableWidth)
					return [...bookmarksListAcc, bookmark];
				else {
					mapBookmarkHierarchyOverflow(bookmark);
					bookmark.parentOverflow = true;
					bookmarksListAcc
						.find((bookmark) => bookmark.id === OVERFLOW)
						.children.push(bookmark);
					return [...bookmarksListAcc];
				}
			},
			[_.cloneDeep(OVERFLOW_FOLDER_OBJ)],
		);

		reducedBookmarksList.push(reducedBookmarksList.shift());
		return reducedBookmarksList;
	} else return bookmarksList;
};

export const precedeZero = (number, size) => {
	let numString = number.toString();
	while (numString.length < (size || 2)) {
		numString = "0" + numString;
	}
	return numString;
};

export const processNotes = (notes, searchText, trashSubView) => {
	const processedValue = searchText.trim().toLowerCase();
	return notes
		.filter((note) => (note.deleted === trashSubView ? true : false))
		.filter((note) =>
			processedValue === ""
				? true
				: note.body.toLowerCase().includes(processedValue),
		)
		.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
};

export const randomElement = (array) =>
	array[Math.floor(Math.random() * array.length)];

export const removeRefClassName = (ref, className) =>
	ref.current.classList.remove(className);

export const requestPermissions = (permssions) =>
	new Promise((resolve, reject) =>
		chrome.permissions.request({ permissions: [...permssions] }, (granted) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(granted),
		),
	);

export const setBodyTheme = (themeColour) => {
	const colours = Object.values(THEME_COLOUR_OPTIONS).map(({ key }) => key);
	colours.map((colour) => {
		document.body.classList.remove(colour);
		document.body.classList.remove(toColourClassName(colour));
	});
	document.body.classList.add(themeColour);
	document.body.classList.add(toColourClassName(themeColour));
};

export const setBodyFont = (themeFont) => {
	const fonts = Object.values(THEME_FONT_OPTIONS).map(({ key }) => key);
	fonts.map((font) => document.body.classList.remove(toFontClassName(font)));
	document.body.classList.add(toFontClassName(themeFont));
};

export const setLocalStorageItem = (key, value) =>
	localStorage.setItem(key, value);

export const toCSSUrl = (link) => `url("${link}")`;

export const toColourClassName = (className) => `${className}-full`;

export const toFontClassName = (className) => `f--${className}`;

export const toLowerCase = (string) => _.toLower(string);

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

export const toggleFullscreen = async (
	notesRef,
	appWrapperRef,
	notesAppRef,
) => {
	addRefClassName(notesRef, HIDE_CONTENT);
	await new Promise((resolve) =>
		setTimeout(() => resolve(removeRefClassName(notesRef, HIDE_CONTENT)), 300),
	);
	toggleRefClassNames(notesRef, [FULLSCREEN, SHOW_ANYWAY]);
	toggleRefClassNames(appWrapperRef, [NIPPLE, NIPPLE_BOTTOM_RIGHT]);
	toggleRefClassName(notesAppRef, FULLSCREEN_TEXTAREA);
	const isFullscreen = notesRef.current.classList.contains(FULLSCREEN);
	notesAppRef.current.style.position = isFullscreen ? "fixed" : "";
	notesAppRef.current.style.inset = isFullscreen ? "0px" : "";
	notesAppRef.current.style.transition = isFullscreen
		? "all 200ms ease 0s"
		: "";
	return isFullscreen;
};

export const toHourFormat = (hour, timePeriod, hour12clock) => {
	if (hour12clock) {
		return +hour % 12 === 0 ? 12 : +hour % 12;
	} else {
		return +hour % 12 === 0
			? hour / 1
			: timePeriod === AM
			? +hour % 12
			: (+hour % 12) + 12;
	}
};

export const toPlayerIcon = (icon) => {
	const iconClassList = Array.from(icon.classList);
	iconClassList.map((className) => icon.classList.remove(className));
	icon.classList.add("icon");
	icon.classList.add("player-icon");
	icon.setAttribute("data-v-1d87a849", "");
};

export const toggleRefClassName = (ref, className) =>
	ref.current.classList.toggle(className);

export const toggleRefClassNames = (ref, classNames) =>
	classNames.map((className) => toggleRefClassName(ref, className));

export const toDays = (seconds) => seconds / ONE_DAY;

export const toMilliseconds = (seconds) => seconds * 1000;

export const toWeeks = (seconds) => seconds / ONE_WEEK;
