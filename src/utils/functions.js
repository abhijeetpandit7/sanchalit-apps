import React from "react";
import Cookies from "universal-cookie";
import moment from "moment";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import * as amplitude from "@amplitude/analytics-browser";
import {
	_LEFT,
	_NIPPLE_DISPLACEMENT,
	_RIGHT,
	_TOP,
	_WIDTH,
	ACTIVE,
	AM,
	AUTH,
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
	HIDDEN,
	HIDE_CONTENT,
	NIPPLE,
	NIPPLE_BOTTOM_RIGHT,
	NIPPLE_TOP_LEFT,
	NIPPLE_TOP_RIGHT,
	ONE_DAY,
	ONE_WEEK,
	OPEN,
	OVERFLOW,
	PM,
	POPUP,
	PRODUCTION,
	SHOW_ANYWAY,
	SAFARI,
	SHIFT_TO_LEFT,
	SHOW,
	SHOW_FADE_IN,
	TODO_LIST_DONE_ID,
	URL_ROOT_DOMAIN,
	BROWSER_LIST,
	GENERAL_SETTING_APP_LIST,
	GENERAL_SETTING_APPEARANCE_LIST,
	NOTE_DELIGHTER_LIST,
	THEME_COLOUR_OPTIONS,
	THEME_FONT_OPTIONS,
	APPS_OBJ,
	BOOKMARKS_MANAGER_OBJ,
	DASH_APP_STYLES,
	DEFAULT_COUNTDOWN_OBJ,
	DEFAULT_NOTE_OBJ,
	DEFAULT_TODO_ITEM_OBJ,
	DEFAULT_TODO_LIST_OBJ,
	HOME_TAB_OBJ,
	OVERFLOW_FOLDER_OBJ,
	TOP_SITES_FOLDER_OBJ,
	chromeIcon,
	edgeIcon,
	appsBase64Source,
	bookmarksManagerBase64Source,
} from "../utils";

const addOrMergeArrayElements = (
	array,
	newElements,
	identifier,
	ignorePreviousArrayItems,
) => {
	if (array.length === 0) return newElements;

	const elementMap = array.reduce((map, element) => {
		map.set(element[identifier], element);
		return map;
	}, new Map());

	if (ignorePreviousArrayItems) {
		const newElementMap = newElements.reduce((map, element) => {
			map.set(element[identifier], element);
			return map;
		}, new Map());
		newElements.forEach((element) => {
			newElementMap.set(element[identifier], {
				...elementMap.get(element[identifier]),
				...newElementMap.get(element[identifier]),
			});
		});
		return Array.from(newElementMap.values());
	}

	newElements.forEach((element) => {
		elementMap.set(element[identifier], {
			...elementMap.get(element[identifier]),
			...element,
		});
	});
	return Array.from(elementMap.values());
};

export const addOrMergeObjectProperties = (
	object,
	newProperties,
	ignorePreviousArrayItems = false,
) => {
	const mergedObject = { ...object };

	for (const [key, newValue] of Object.entries(newProperties)) {
		const oldValue = object[key];
		if (_.isArray(oldValue) && _.isArray(newValue)) {
			const customKeys = ["countdowns", "notes", "todoLists", "todos"];
			mergedObject[key] = addOrMergeArrayElements(
				oldValue,
				newValue,
				"id",
				ignorePreviousArrayItems && customKeys.includes(key),
			);
		} else if (_.isObject(oldValue) && _.isObject(newValue)) {
			mergedObject[key] = addOrMergeObjectProperties(oldValue, newValue);
		} else {
			mergedObject[key] = newValue;
		}
	}

	return mergedObject;
};

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
	const instantDate = new Date();
	newCountdown.createdDate = instantDate.toISOString();
	newCountdown.updatedDate = instantDate.getTime();
	return newCountdown;
};

export const createNote = () => {
	const newNote = _.cloneDeep(DEFAULT_NOTE_OBJ);
	newNote.id = uuidv4();
	const instantDate = new Date();
	newNote.createdDate = instantDate.toISOString();
	newNote.updatedDate = instantDate.getTime();
	return newNote;
};

export const createTodo = () => {
	const newTodo = _.cloneDeep(DEFAULT_TODO_ITEM_OBJ);
	newTodo.id = uuidv4();
	const instantDate = new Date();
	newTodo.createdDate = instantDate.toISOString();
	newTodo.ts = instantDate.getTime();
	return newTodo;
};

export const createNewTodoList = () => {
	const newTodoList = _.cloneDeep(DEFAULT_TODO_LIST_OBJ);
	newTodoList.id = uuidv4();
	const instantDate = new Date();
	newTodoList.createdDate = instantDate.toISOString();
	newTodoList.ts = instantDate.getTime();
	return newTodoList;
};

export const ensureTodoItemDropdownVisible = (
	todoAppRef,
	dropdownRef,
	dropdownHeight,
) => {
	const dropdownList = dropdownRef.current.querySelector(".dropdown-list");
	const todoList = todoAppRef.current.querySelector("ol.todo-list");
	const todoItem = dropdownRef.current.closest(".todo-item");
	const dropdownListHeight = dropdownHeight ?? dropdownList.offsetHeight;
	const isOverflowing = dropdownListHeight > todoList.offsetHeight;
	let offset;

	if (isOverflowing)
		offset = Math.min(
			dropdownListHeight + 5,
			document.body.getBoundingClientRect().height - 150,
		);

	const differenceHeight =
		todoList.getBoundingClientRect().top +
		todoList.offsetHeight -
		(todoItem.getBoundingClientRect().top +
			todoItem.offsetHeight +
			dropdownListHeight);

	if (differenceHeight < 4) {
		dropdownRef.current.style.top = `${Math.max(
			todoList.getBoundingClientRect().top -
				todoItem.getBoundingClientRect().top,
			differenceHeight + 18,
		)}px`;
		dropdownRef.current.style.right = "40px";
	} else {
		dropdownRef.current.style.top = "28px";
	}
	dropdownRef.current.style.bottom = "auto";

	if (isOverflowing) return offset;
	else return true;
};

export const getExtensionStorageItem = (key) =>
	new Promise((resolve, reject) =>
		chrome.storage.local.get(key, (result) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(result[key]),
		),
	);

export const focusCursorAtEnd = (element) => {
	const setpos = document.createRange();
	const set = window.getSelection();
	if (element.childNodes[0])
		setpos.setStart(element.childNodes[0], element.innerText.length);
	setpos.collapse(true);
	set.removeAllRanges();
	set.addRange(setpos);
	element.focus();
};

export const focusDisplayName = (displayNameRef) => {
	const element = displayNameRef.current;
	if (element.innerText === EMPTY_NAME) element.innerText = "";
	focusCursorAtEnd(element);
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
	calendarDate = false,
	friendlyDate = false,
} = {}) => {
	const date = moment(timestamp);
	const dateIsInThisYear = date.isSame(moment(), "year");
	const dateDifference = date
		.startOf("day")
		.diff(moment().startOf("day"), "days");
	if (relativeDay || friendlyDate) {
		switch (dateDifference) {
			case 0:
				return "Today";
			case 1:
				return "Tomorrow";
			case -1:
				return "Yesterday";
			default:
				if (friendlyDate) break;
				const monthlyDayFormat = date.format("MMMM D");
				return dateIsInThisYear
					? monthlyDayFormat
					: formatYearRelative(monthlyDayFormat, timestamp);
		}
	}
	const dateIsToday = date.isSame(moment(), "day");
	const dateIsInLast7d = dateDifference > -7 && dateDifference < 0;
	const monthlyDayFormat = date.format(
		`${calendarDate || friendlyDate ? "MMMM" : "MMM"} D`,
	);

	if (dateIsToday && calendarDate === false)
		return formatTime({ timestamp, hour12clock });
	else if (dateIsInLast7d && calendarDate === false)
		return date.format(`${friendlyDate ? "dddd" : "ddd"}`);
	else if (dateIsInThisYear) return monthlyDayFormat;
	else return formatYearRelative(monthlyDayFormat, timestamp);
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

export const getBrowserCookieItem = (key) =>
	new Promise((resolve, reject) =>
		chrome.cookies.get({ url: URL_ROOT_DOMAIN, name: key }, (result) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(result?.value),
		),
	);

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

const getDateInUnix = (date) => moment(date).unix();

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

export const getLocalStorageItem = (key) =>
	JSON.parse(localStorage.getItem(key));

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

export const getLocalCookieItem = (key) => new Cookies().get(key);

export const getPermissionAllowed = (permission) =>
	new Promise((resolve, reject) =>
		chrome.permissions.contains({ permissions: [permission] }, (allowed) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(allowed),
		),
	);

export const getNewOrderValue = (items, listId) => {
	let newOrderValue;
	try {
		newOrderValue =
			items
				.filter((item) => (listId ? item.listId === listId : true))
				.reduce((prev, current) =>
					prev.order > current.order ? prev : current,
				).order + 1;
	} catch (error) {
		newOrderValue = 0;
	}
	return newOrderValue;
};

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

export const initAmplitude = (auth) => {
	amplitude.init(process.env.AMPLITUDE_API_KEY, auth.userId, {
		defaultTracking: true,
	});
	amplitude.identify(
		new amplitude.Identify().set(
			AUTH,
			replaceNullObjectProperties(
				_.pick(auth, ["email", "subscriptionSummary"]),
			),
		),
	);
};

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

export const isActiveSubscription = (subscriptionSummary) => {
	const { startDate, endDate } = subscriptionSummary;
	const isActive = moment().isBetween(moment(startDate), moment(endDate));
	return isActive;
};

export const isBoolean = (value) => typeof value === "boolean";

/*
 * This recursively compares two objects' properties.
 * The customizer function handles cases where properties are arrays or objects,
 * sorting them before comparison using isEqual.
 * Extra properties will cause isEqualWith to return false.
 */
export const isDeepEqual = (obj1, obj2) =>
	_.isEqualWith(obj1, obj2, (val1, val2) => {
		if (_.isArray(val1) && _.isArray(val2)) {
			return _.isEqual(_.sortBy(val1), _.sortBy(val2));
		}
		if (_.isObject(val1) && _.isObject(val2)) {
			return isDeepEqual(_.sortBy(_.values(val1)), _.sortBy(_.values(val2)));
		}
	});

export const isObjectEmpty = (obj) => (_.isObject(obj) ? _.isEmpty(obj) : true);

export const isValidListOrder = (list) => {
	let orderValues = new Set();
	let maxOrderValue = null;
	for (let i = 0; i < list.length; i++) {
		const object = list[i];
		const order = object.order;
		if (order === null) return false;
		if (orderValues.has(order)) return false;
		if (maxOrderValue === null || order > maxOrderValue) maxOrderValue = order;
		orderValues.add(order);
	}
	return maxOrderValue === orderValues.size - 1;
};

const isTouchDevice = () =>
	/iPhone|iPod|iPad|Android/.test(navigator.userAgent) ||
	(navigator.userAgent.includes("Mac") && "ontouchend" in document);

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

export const updateTodoAppHeight = (todoAppRef, appHeight) => {
	let flag,
		visibleHeight = 0,
		offset = 30;
	const todoList = todoAppRef.current.querySelector(".todo-list");
	const heightLimit = getHeightLimit(todoAppRef);

	if (heightLimit) {
		if (appHeight === void 0) {
			const isFirefox = getBrowserType().name === FIREFOX;
			appHeight = 2;
			if (todoList.children.length === 0) return;
			for (let todo of todoList.children) {
				todo.style.display !== "none" &&
					(appHeight += isFirefox ? todo.scrollHeight + 1 : todo.scrollHeight);
			}

			const todoActiveListContainer = todoAppRef.current.querySelector(
				".active-list-container",
			);
			const isTodoActiveListContainerExpanded =
				todoActiveListContainer.classList.contains(ACTIVE);
			isTodoActiveListContainerExpanded &&
				(appHeight = Math.max(
					todoActiveListContainer.querySelector(".dropdown").scrollHeight,
					appHeight,
				));

			const todoHeaderControl = todoAppRef.current.querySelector(
				".todo-header-control",
			);
			const isTodoHeaderControlExpanded =
				todoHeaderControl.classList.contains(ACTIVE);
			isTodoHeaderControlExpanded &&
				(appHeight = Math.max(
					todoHeaderControl.querySelector(".dropdown").scrollHeight,
					appHeight,
				));

			flag = true;
			visibleHeight = Math.min(appHeight, heightLimit);
		}

		appHeight >= todoList.scrollHeight
			? ((appHeight = Math.min(appHeight, heightLimit)),
			  (offset = appHeight + "px"),
			  (todoList.parentElement.style.minHeight = offset))
			: ((todoList.parentElement.style.minHeight =
					Math.max(visibleHeight, appHeight, 30) + "px"),
			  (offset = Math.max(visibleHeight, appHeight, 30) + "px")),
			(todoList.style.minHeight = offset),
			(todoList.parentElement.style.maxHeight =
				(flag ? appHeight : heightLimit) + "px"),
			(todoList.style.maxHeight = (flag ? appHeight : heightLimit) + "px");
	}
};

const getHeightLimit = (todoAppRef) => {
	const todoApp = todoAppRef.current.closest(".app");
	const todoHeaderHeight = todoApp.querySelector(".todo-header").offsetHeight;
	if (!todoHeaderHeight) return null;

	const todoInputHeight = todoApp.querySelector(".todo-new").offsetHeight || 0;
	const topOrBottomClearance =
		document.querySelector(".top-left").offsetHeight +
		document.querySelector(".bottom").offsetHeight;
	const mobileMaxWidth = 450;
	const mobileTopOrBottomClearance = 60;
	const clearance =
		window.innerWidth >= mobileMaxWidth
			? topOrBottomClearance
			: mobileTopOrBottomClearance;

	const heightLimit =
		document.body.getBoundingClientRect().height -
		(clearance + todoHeaderHeight + todoInputHeight + 4);
	if (isTouchDevice()) {
		return Math.min(
			window.visualViewport.height - todoHeaderHeight - todoInputHeight - 10,
			heightLimit,
		);
	}
	return heightLimit;
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

export const processTodoLists = (todoLists) =>
	todoLists.sort((a, b) => a.order - b.order);

export const processTodos = (todos, activeTodoListId) =>
	activeTodoListId === TODO_LIST_DONE_ID
		? todos
				.filter((todo) => todo.done)
				.sort((a, b) => b.completedDate - a.completedDate)
		: todos
				.filter((todo) => todo.listId === activeTodoListId)
				.sort((a, b) => b.ts - a.ts)
				.sort((a, b) => a.order - b.order);

export const randomElement = (array) =>
	array[Math.floor(Math.random() * array.length)];

export const removeRefClassName = (ref, className) =>
	ref.current.classList.remove(className);

export const reorderListOnDrag = (list, startIndex, endIndex) => {
	const reorderedList = Array.from(list);
	const [movedItem] = reorderedList.splice(startIndex, 1);
	reorderedList.splice(endIndex, 0, movedItem);
	return reorderedList;
};

const replaceNullObjectProperties = (object) => {
	const newObject = { ...object };
	for (const [key, value] of Object.entries(newObject)) {
		if (value === null) newObject[key] = 0;
		else if (_.isObject(value))
			newObject[key] = replaceNullObjectProperties(value);
	}
	return newObject;
};

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

export const setBrowserCookieItem = (key, value) =>
	new Promise((resolve, reject) =>
		chrome.cookies.set(
			{
				domain: `.${URL_ROOT_DOMAIN.split("https://")[1]}`,
				url: URL_ROOT_DOMAIN,
				name: key,
				value: value,
				expirationDate: getDateInUnix(getDateFromToday(365)),
			},
			() =>
				chrome.runtime.lastError
					? reject(Error(chrome.runtime.lastError.message))
					: resolve(),
		),
	);

export const setExtensionStorageItem = (key, value) =>
	new Promise((resolve, reject) =>
		chrome.storage.local.set({ [key]: value }, (result) =>
			chrome.runtime.lastError
				? reject(Error(chrome.runtime.lastError.message))
				: resolve(result),
		),
	);

export const setLocalCookieItem = (key, value) =>
	new Cookies().set(key, value, {
		domain:
			process.env.NODE_ENV === PRODUCTION
				? `.${URL_ROOT_DOMAIN.split("https://")[1]}`
				: "",
		expires: getDateFromToday(365),
	});

export const setLocalStorageItem = (key, value) =>
	localStorage.setItem(key, JSON.stringify(value));

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
	notesToggleAppRef,
	appWrapperRef,
	notesAppRef,
) => {
	addRefClassName(notesRef, HIDE_CONTENT);
	await new Promise((resolve) =>
		setTimeout(() => resolve(removeRefClassName(notesRef, HIDE_CONTENT)), 300),
	);
	toggleRefClassName(notesToggleAppRef, HIDDEN);
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

export const toHourFormat = (hour, getInHour12clock, timePeriod) => {
	if (getInHour12clock) {
		return +hour % 12 === 0 ? 12 : +hour % 12;
	} else {
		return +hour % 12 === 0 && timePeriod === AM
			? 0
			: +hour % 12 === 0 && timePeriod === PM
			? 12
			: +hour % 12 === 0
			? +hour / 1
			: timePeriod === AM
			? +hour % 12
			: timePeriod === PM
			? +hour + 12
			: +hour;
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

export const trimSpacesWithin = (string) => string.replace(/\s+/g, "");
