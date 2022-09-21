export const ABOUT = "About";
export const ACTIVE = "active";
export const ADD_SHADOW = "add-shadow";
export const API = "api";
export const AUTH = "auth";
export const BALANCE = "Balance";
export const BACKGROUND = "Background";
export const BING = "Bing";
export const BOOKMARKS = "Bookmarks";
export const BOOKMARKS_PERMISSION = "bookmarks";
const BOOKMARKS_VISIBLE = "bookmarksVisible";
export const CHROME = "chrome";
const CHROMIUM = "chromium";
export const CLOCK = "Clock";
const CLOCK_VISIBLE = "clockVisible";
export const CUSTOMIZATION = "customization";
export const DEFAULT = "default";
export const DISABLED = "disabled";
export const DUCK_DUCK_GO = "DuckDuckGo";
export const EDGE = "edge";
export const ECOSIA = "Ecosia";
export const EDITING = "editing";
export const EMPTY_NAME = "empty-name";
export const FIREFOX = "firefox";
export const FOLDER_DROPDOWN = "folder-dropdown";
export const HIDE_APPS = "hide-apps";
export const GENERAL = "General";
export const GOOGLE = "Google";
export const GREETING = "Greeting";
const GREETING_VISIBLE = "greetingVisible";
export const HELP = "Help";
export const HIDE_BACKGROUND_OVERLAY = "hide-background-overlay";
export const HIDE_VISIBILITY = "m-hide-visibility";
export const HOTKEY_HOVER = "hotkey-hover";
export const IMAGES = "images";
export const INPUT_WRAPPER = "input-wrapper";
export const LINKS_AND_BOOKMARKS = "Links & Bookmarks";
export const MANTRAS = "Mantras";
export const NAV_ACTIVE = "nav-active";
export const NOTES = "Notes";
const NOTES_VISIBLE = "notesVisible";
const NOTES_DESCRIPTION = "Take quick notes and store wisdom to review";
export const ON = "on";
export const OPEN = "open";
export const OVERFLOW = "overflow";
export const PARENT_ID = "1";
export const PHOTOS = "Photos";
export const PRODUCTION = "production";
export const PULSE = "pulse";
export const QUERY_PARAM = "q";
export const QUOTES = "Quotes";
const QUOTES_VISIBLE = "quotesVisible";
export const SAFARI = "safari";
export const SEARCH = "Search";
const SEARCH_VISIBLE = "searchVisible";
export const SEARCH_IN_CENTER = "Search in Center";
export const SHIFT_TO_LEFT = "shift-to-left";
export const SHOW = "show";
export const SHOW_ANYWAY = "show-anyway";
export const SHOW_FADE_IN = "show-fade-in";
export const STATIC_RESOURCES = "static-resources";
export const SYSTEM = "system";
export const TODO = "Todo";
const TODO_VISIBLE = "todoVisible";
export const WEB = "web";

export const ONE_SECOND = 1;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_YEAR = ONE_DAY * 365;

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
		unsupported: process.env.BUILD_TARGET === SAFARI,
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
	{ value: HELP, secondary: true },
	{ value: ABOUT, secondary: true },
];

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
		iconsOnly: false,
		openInNewTab: false,
		includeOtherBookmarks: false,
		defaultMostVisited: false,
		includeMostVisited: false,
	},
	[BOOKMARKS_VISIBLE]: false,
	[CLOCK_VISIBLE]: true,
	displayName: null,
	displayNameVisible: true,
	[GREETING_VISIBLE]: true,
	hour12clock: true,
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
	themeColour: SYSTEM,
	themeFont: DEFAULT,
};
