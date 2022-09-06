export const ACTIVE = "active";
export const ABOUT = "About";
export const AUTH = "auth";
export const BALANCE = "Balance";
export const CUSTOMIZATION = "customization";
export const DEFAULT = "default";
export const HIDE_APPS = "hide-apps";
export const GENERAL = "General";
export const GOOGLE = "google";
export const HELP = "Help";
export const HIDE_BACKGROUND_OVERLAY = "hide-background-overlay";
export const HIDE_VISIBILITY = "m-hide-visibility";
export const IMAGES = "images";
export const LINKS_AND_BOOKMARKS = "Links & Bookmarks";
export const MANTRAS = "Mantras";
export const NAV_ACTIVE = "nav-active";
export const ON = "on";
export const OPEN = "open";
export const PHOTOS = "Photos";
export const PRODUCTION = "production";
export const QUERY_PARAM = "q";
export const QUOTES = "Quotes";
export const SEARCH_ACTION = `https://www.google.com/search?${QUERY_PARAM}=`;
export const SHOW = "show";
export const SHOW_FADE_IN = "show-fade-in";
export const STATIC_RESOURCES = "static-resources";
export const SYSTEM = "system";
export const TODO = "Todo";
export const WEB = "web";

export const ONE_SECOND = 1;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_YEAR = ONE_DAY * 365;

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
	clockVisible: true,
	displayName: null,
	greetingVisible: true,
	hour12clock: true,
	notesVisible: true,
	quoteVisible: true,
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
	searchVisible: true,
	searchSettings: {
		inCenter: true,
		provider: GOOGLE,
	},
	todoVisible: true,
	themeColour: SYSTEM,
	themeFont: DEFAULT,
};
