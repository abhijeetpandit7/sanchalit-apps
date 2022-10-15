export const ABOUT = "About";
export const ACTIVE = "active";
export const ADD_SHADOW = "add-shadow";
export const API = "api";
const APPS = "Apps";
const APPS_URL = "chrome://apps";
const APPS_LOCATION = "appsLocation";
export const AUTH = "auth";
export const BALANCE = "Balance";
export const BACKGROUND = "Background";
export const BING = "Bing";
export const BOOKMARKS = "Bookmarks";
export const BOOKMARK_ACTION_WIDTH = 30;
export const BOOKMARKS_BAR_ID = "1";
export const BOOKMARKS_BAR_FIREFOX_ID = "toolbar_____";
export const BOOKMARKS_ROOT_ID = "0";
export const BOOKMARKS_ROOT_FIREFOX_ID = "root________";
const BOOKMARKS_MANAGER_URL = "chrome://bookmarks";
export const BOOKMARKS_PERMISSION = "bookmarks";
const BOOKMARKS_VISIBLE = "bookmarksVisible";
export const BROWSER_TYPE = "browserType";
export const CHROME = "Chrome";
const CHROMIUM = "chromium";
const CHROMIUM_TAB_URL = "chrome-search://local-ntp/local-ntp.html";
const CLASSIC = "classic";
export const CLOCK = "Clock";
const CLOCK_VISIBLE = "clockVisible";
export const CUSTOMIZATION = "customization";
export const DASH = "Dash";
export const DARK = "dark";
export const DEFAULT = "default";
const DEFAULT_MOST_VISITED = "defaultMostVisited";
export const DELETE_CONF_ACTIVE = "delete-conf-active";
export const DISABLED = "disabled";
export const DUCK_DUCK_GO = "DuckDuckGo";
export const EDGE = "Edge";
export const ECOSIA = "Ecosia";
export const EDITING = "editing";
export const EMPTY_NAME = "empty-name";
export const FADEIN = "fadein";
export const FIREFOX = "Firefox";
export const FOLDER_DROPDOWN = "folder-dropdown";
export const HIDE_APPS = "hide-apps";
export const GENERAL = "General";
export const GOOGLE = "Google";
export const GREETING = "Greeting";
const GREETING_VISIBLE = "greetingVisible";
export const HELP = "Help";
export const HIDE_BACKGROUND_OVERLAY = "hide-background-overlay";
export const HIDE_VISIBILITY = "m-hide-visibility";
const HOME_TAB_LOCATION = "homeTabLocation";
export const HOTKEY_HOVER = "hotkey-hover";
const ICONS_ONLY = "iconsOnly";
export const IMAGES = "images";
const INCLUDE_BOOKMARKS_MANAGER = "includeBookmarksManager";
const INCLUDE_MOST_VISITED = "includeMostVisited";
const INCLUDE_OTHER_BOOKMARKS = "includeOtherBookmarks";
export const INPUT_WRAPPER = "input-wrapper";
export const LIGHT = "light";
export const LINKS_AND_BOOKMARKS = "Links & Bookmarks";
export const MANTRAS = "Mantras";
const MODERN = "modern";
export const NAV_ACTIVE = "nav-active";
const NONE = "None";
export const NOTES = "Notes";
const NOTES_VISIBLE = "notesVisible";
const NOTES_DESCRIPTION = "Take quick notes and store wisdom to review";
export const ON = "on";
export const OPEN = "open";
const OPEN_IN_NEW_TAB = "openInNewTab";
export const OVERFLOW = "overflow";
export const PHOTOS = "Photos";
export const PHOTO_INFO = "Photo Info";
export const PRODUCTION = "production";
export const PULSE = "pulse";
export const QUERY_PARAM = "q";
const QUIRKY = "quirky";
export const QUOTES = "Quotes";
const QUOTES_VISIBLE = "quotesVisible";
const RETRO = "retro";
export const SAFARI = "Safari";
export const SEARCH = "Search";
const SEARCH_VISIBLE = "searchVisible";
export const SEARCH_IN_CENTER = "Search in Center";
export const SHIFT_TO_LEFT = "shift-to-left";
export const SHOW = "show";
export const SHOW_ANYWAY = "show-anyway";
export const SHOW_FADE_IN = "show-fade-in";
export const SHOW_TOP_SITES = "Show Top Sites";
export const START_IN_TOP_SITES = "Start in Top Sites";
const STARTUP = "startup";
export const STATIC_RESOURCES = "static-resources";
export const SYSTEM = "system";
const THEME_COLOUR = "themeColour";
const THEME_FONT = "themeFont";
export const TODO = "Todo";
const TODO_VISIBLE = "todoVisible";
export const TOP_SITES = "Top Sites";
const TOP_SITES_DESCRIPTION =
	"Show most visited websites by default in Bookmarks Bar";
export const TOP_SITES_PERMISSION = "topSites";
const WAREHOUSE = "warehouse";
const WEB = "web";

export const ONE_SECOND = 1;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_YEAR = ONE_DAY * 365;

const isExtensionBuildTargetSafari = process.env.BUILD_TARGET === "safari";
const isExtensionBuildTargetChromium = process.env.BUILD_TARGET === CHROMIUM;
export const isBuildTargetWeb = process.env.BUILD_TARGET === WEB;

const APP_LOCATION_OPTIONS = [
	{ name: BOOKMARKS, key: BOOKMARKS },
	{ name: DASH, key: DASH },
	{ name: NONE, key: NONE },
];
export const THEME_COLOUR_OPTIONS = [
	{ name: DARK, key: DARK },
	{ name: LIGHT, key: LIGHT },
	{ name: SYSTEM, key: SYSTEM },
];
export const THEME_FONT_OPTIONS = [
	{ name: CLASSIC, key: CLASSIC },
	{ name: MODERN, key: MODERN },
	{ name: STARTUP, key: STARTUP },
	{ name: RETRO, key: RETRO },
	{ name: WAREHOUSE, key: WAREHOUSE },
	{ name: QUIRKY, key: QUIRKY },
];
export const BOOKMARKS_GENERAL_SETTING_LIST = [
	{
		name: "Icons only",
		description: "Hide titles for a clean and compact look",
		key: ICONS_ONLY,
	},
	{
		name: START_IN_TOP_SITES,
		description: TOP_SITES_DESCRIPTION,
		key: DEFAULT_MOST_VISITED,
		requirePermission: true,
		unsupported: isExtensionBuildTargetSafari,
	},
	{
		name: SHOW_TOP_SITES,
		description: "Add a folder with most visited websites to Bookmarks Bar",
		key: INCLUDE_MOST_VISITED,
		requirePermission: true,
		unsupported: isExtensionBuildTargetSafari,
	},
	{
		name: "Show Bookmarks Manager",
		key: INCLUDE_BOOKMARKS_MANAGER,
		unsupported: isExtensionBuildTargetChromium === false,
	},
	{ name: "Show Other Bookmarks", key: INCLUDE_OTHER_BOOKMARKS },
];
export const BOOKMARKS_FEED_SETTING_LIST = [
	{
		name: `Show ${BROWSER_TYPE} Tab in`,
		key: HOME_TAB_LOCATION,
		toggleOptions: true,
		options: APP_LOCATION_OPTIONS,
		unsupported: isExtensionBuildTargetChromium === false,
	},
	{
		name: "Show Apps in	",
		key: APPS_LOCATION,
		toggleOptions: true,
		options: APP_LOCATION_OPTIONS,
		unsupported: isExtensionBuildTargetChromium === false,
	},
	{ name: "Open links in new tab", key: OPEN_IN_NEW_TAB },
];
export const BROWSER_LIST = [
	{ name: CHROME, key: CHROMIUM },
	{ name: EDGE, key: CHROMIUM },
	{ name: FIREFOX, key: FIREFOX },
	{ name: SAFARI, key: SAFARI },
];
export const GENERAL_SETTING_APP_LIST = [
	{
		name: BOOKMARKS,
		key: BOOKMARKS_VISIBLE,
		requirePermission: true,
		unsupported: isExtensionBuildTargetSafari,
	},
	{
		name: TOP_SITES,
		description: TOP_SITES_DESCRIPTION,
		key: DEFAULT_MOST_VISITED,
		ignoreVisibility: true,
		requirePermission: true,
		unsupported: isExtensionBuildTargetSafari,
	},
	{ name: SEARCH, key: SEARCH_VISIBLE },
	{ name: CLOCK, key: CLOCK_VISIBLE },
	{ name: GREETING, key: GREETING_VISIBLE },
	{ name: TODO, key: TODO_VISIBLE },
	{ name: QUOTES, key: QUOTES_VISIBLE },
	{
		name: NOTES,
		key: NOTES_VISIBLE,
		plus: true,
		description: NOTES_DESCRIPTION,
	},
];
export const GENERAL_SETTING_APPEARANCE_LIST = [
	{
		name: "Theme",
		key: THEME_COLOUR,
		toggleOptions: true,
		options: THEME_COLOUR_OPTIONS,
	},
	{
		name: "Font",
		key: THEME_FONT,
		plus: true,
		toggleOptions: true,
		options: THEME_FONT_OPTIONS,
	},
];
export const SEARCH_PROVIDER_LIST = [
	{
		name: GOOGLE,
		action: `https://www.google.com/search?${QUERY_PARAM}=`,
		colouredIconKey: "googleColouredIcon",
		base64SourceKey: "googleBase64Source",
	},
	{
		name: BING,
		action: `https://www.bing.com/search?${QUERY_PARAM}=`,
		colouredIconKey: "bingColouredIcon",
		base64SourceKey: "bingBase64Source",
	},
	{
		name: DUCK_DUCK_GO,
		action: `https://www.duckduckgo.com/?${QUERY_PARAM}=`,
		colouredIconKey: "duckDuckGoColouredIcon",
		base64SourceKey: "duckDuckGoBase64Source",
	},
	{
		name: ECOSIA,
		action: `https://www.ecosia.org/search?${QUERY_PARAM}=`,
		colouredIconKey: "ecosiaColouredIcon",
		base64SourceKey: "ecosiaBase64Source",
	},
];
export const SETTINGS_NAV_LIST = [
	{ value: GENERAL },
	{ value: BOOKMARKS },
	{ value: HELP, secondary: true },
	{ value: ABOUT, secondary: true },
];
export const QUICK_TIP_LIST = [
	"Sanchalit's Photo, Quote & Mantra change automatically each day.",
	"You can change between a 12 hour or 24 hour clock.",
	"Double-clicking your display name will let you edit it.",
];
export const NOTE_DELIGHTER_LIST = [
	"Record some wisdom",
	"This is your canvas",
	"Think of the possibilities...",
	"Type a tidbit",
	"Type something cool!",
	"Use your words",
];

export const APPS_OBJ = {
	id: APPS,
	parentId: BOOKMARKS_ROOT_ID,
	title: APPS,
	url: APPS_URL,
};
export const BOOKMARKS_MANAGER_OBJ = {
	id: BOOKMARKS,
	parentId: BOOKMARKS_ROOT_ID,
	title: BOOKMARKS,
	url: BOOKMARKS_MANAGER_URL,
};
export const HOME_TAB_OBJ = {
	id: `${CHROMIUM} Tab`,
	parentId: BOOKMARKS_ROOT_ID,
	title: "",
	url: CHROMIUM_TAB_URL,
};
export const OVERFLOW_FOLDER_OBJ = {
	id: OVERFLOW,
	parentId: BOOKMARKS_ROOT_ID,
	title: OVERFLOW,
	width: BOOKMARK_ACTION_WIDTH,
	children: [],
};
export const TOP_SITES_FOLDER_OBJ = {
	id: TOP_SITES,
	parentId: BOOKMARKS_ROOT_ID,
	title: TOP_SITES,
	children: [],
};
export const DEFAULT_NOTE_OBJ = {
	id: "",
	body: "",
	createdDate: new Date(),
	deleted: false,
	empty: true,
	updatedDate: new Date().getTime(),
};

export const DEFAULT_AUTHENTICATION = {
	activeSubscription: false,
	birthDate: null,
	created: null,
	displayName: null,
	email: {
		created: null,
		address: null,
		isValidated: false,
	},
	fullName: null,
	subscriptionSummary: {
		active: false,
		firstSubscriptionStart: null,
		subscriptionEnd: null,
		trialing: false,
		trialEnd: null,
	},
	token_uuid: null,
	user_id: null,
};

export const DEFAULT_CUSTOMIZATION = {
	backgroundSettings: {
		data: [
			{
				_id: null,
				destinationName: null,
				fileName: null,
				forDate: null,
				isFavourite: false,
				source: null,
				sourceUrl: null,
				title: null,
				widgetColor: {
					hsla: null,
					bodyTextColor: null,
				},
			},
		],
		ts: null,
	},
	bookmarks: [],
	bookmarksSettings: {
		[ICONS_ONLY]: false,
		[OPEN_IN_NEW_TAB]: false,
		[INCLUDE_OTHER_BOOKMARKS]: false,
		[INCLUDE_BOOKMARKS_MANAGER]: false,
		[INCLUDE_MOST_VISITED]: false,
		[DEFAULT_MOST_VISITED]: false,
		[APPS_LOCATION]: NONE,
		[HOME_TAB_LOCATION]: NONE,
	},
	[BOOKMARKS_VISIBLE]: false,
	[CLOCK_VISIBLE]: true,
	displayName: null,
	displayNameVisible: true,
	[GREETING_VISIBLE]: true,
	hour12clock: true,
	notes: [],
	currentNoteId: null,
	[NOTES_VISIBLE]: true,
	[QUOTES_VISIBLE]: true,
	quoteSettings: {
		data: [
			{
				_id: null,
				body: null,
				forDate: null,
				isCustom: false,
				isFavourite: false,
				source: null,
			},
		],
		ts: null,
	},
	[SEARCH_VISIBLE]: true,
	searchSettings: {
		inCenter: true,
		provider: SEARCH_PROVIDER_LIST[0].name,
	},
	[TODO_VISIBLE]: true,
	topSites: [],
	[THEME_COLOUR]: SYSTEM,
	[THEME_FONT]: CLASSIC,
};
