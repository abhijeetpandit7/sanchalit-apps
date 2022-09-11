export const ACTIVE = "active";
export const ABOUT = "About";
export const AUTH = "auth";
export const BALANCE = "Balance";
export const CUSTOMIZATION = "customization";
export const CLOCK = "Clock";
const CLOCK_VISIBLE = "clockVisible";
export const DEFAULT = "default";
export const EDITING = "editing";
export const EMPTY_NAME = "empty-name";
export const HIDE_APPS = "hide-apps";
export const GENERAL = "General";
export const GOOGLE = "google";
export const GREETING = "Greeting";
const GREETING_VISIBLE = "greetingVisible";
export const HELP = "Help";
export const HIDE_BACKGROUND_OVERLAY = "hide-background-overlay";
export const HIDE_VISIBILITY = "m-hide-visibility";
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
export const PHOTOS = "Photos";
export const PRODUCTION = "production";
export const PULSE = "pulse";
export const QUERY_PARAM = "q";
export const QUOTES = "Quotes";
const QUOTES_VISIBLE = "quotesVisible";
export const SEARCH = "Search";
const SEARCH_VISIBLE = "searchVisible";
export const SEARCH_IN_CENTER = "Search in Center";
export const SEARCH_ACTION = `https://www.google.com/search?${QUERY_PARAM}=`;
export const SHOW = "show";
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

export const GENERAL_SETTING_APP_LIST = [
	{ name: SEARCH, key: [SEARCH_VISIBLE] },
	{ name: CLOCK, key: [CLOCK_VISIBLE] },
	{ name: GREETING, key: [GREETING_VISIBLE] },
	{ name: TODO, key: [TODO_VISIBLE] },
	{ name: QUOTES, key: [QUOTES_VISIBLE] },
	{
		name: NOTES,
		key: [NOTES_VISIBLE],
		plus: true,
		description: NOTES_DESCRIPTION,
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
		provider: GOOGLE,
	},
	[TODO_VISIBLE]: true,
	themeColour: SYSTEM,
	themeFont: DEFAULT,
};
