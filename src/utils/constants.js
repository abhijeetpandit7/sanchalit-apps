import {
	airConditionerIcon,
	arrowRightIcon,
	beachIcon,
	birdsIcon,
	cafeIcon,
	campfireIcon,
	checklistIcon,
	chimesIcon,
	cloudIcon,
	coWorkersIcon,
	coffeeMakerIcon,
	colourPaletteIcon,
	copierIcon,
	creekIcon,
	cricketsIcon,
	cupIcon,
	customIcon,
	fireIcon,
	fluorescentHumIcon,
	folderIcon1,
	forestIcon,
	galleryIcon,
	gardenIcon,
	insectsIcon,
	loudRainIcon,
	mechanicalKeyboardIcon,
	oceanIcon,
	officeIcon,
	rainIcon,
	rainOnSurfaceIcon,
	rainfallIcon,
	randomIcon,
	seagullsIcon,
	streamIcon,
	thunderIcon,
	thunderstormIcon,
	tracksIcon,
	trainIcon,
	windIcon,
} from "./assets";
import { randomElement } from "./functions";

export const _LEFT = "--left";
export const _NIPPLE_DISPLACEMENT = "--nipple-displacement";
export const _RIGHT = "--right";
export const _TOP = "--top";
export const _WIDTH = "--width";
export const ABOUT = "About";
export const ACTIVE = "active";
export const AM = "AM";
export const ADD = "Add";
export const ADD_SHADOW = "add-shadow";
const APPS = "Apps";
const APPS_URL = "chrome://apps";
const APPS_LOCATION = "appsLocation";
export const ARCHIVE = "Archive";
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
const CANCELLED = "cancelled";
export const CHROME = "Chrome";
export const CHROME_EXTENSION = "chrome-extension";
const CHROMIUM = "chromium";
const CHROMIUM_TAB_URL = "chrome-search://local-ntp/local-ntp.html";
const CLASSIC = "classic";
export const CLOCK = "Clock";
const CLOCK_VISIBLE = "clockVisible";
export const COUNTDOWNS = "Countdowns";
const COUNTDOWN_DESCRIPTION = "Count down to important dates and deadlines";
const COUNTDOWN_VISIBLE = "countdownVisible";
export const CUSTOMIZATION = "customization";
export const DARK = "dark";
export const DASH = "Dash";
export const DATE_ROLLOVER_HOUR = 4;
export const DEFAULT = "default";
const DEFAULT_MOST_VISITED = "defaultMostVisited";
export const DELETE_CONF_ACTIVE = "delete-conf-active";
export const DISABLED = "disabled";
export const DISPLAY_LEFT = "display-left";
export const DISPLAY_RIGHT = "display-right";
export const DUCK_DUCK_GO = "DuckDuckGo";
export const EDGE = "Edge";
export const EDIT = "Edit";
export const ECOSIA = "Ecosia";
export const EDITING = "editing";
export const EMPTY_NAME = "empty-name";
const EXPIRED = "expired";
export const FADEIN = "fadein";
export const FIREFOX = "Firefox";
export const FOLDER_DROPDOWN = "folder-dropdown";
export const FULLSCREEN = "fullscreen";
export const FULLSCREEN_TEXTAREA = "fullscreen-textarea";
export const HIDE_APPS = "hide-apps";
export const GENERAL = "General";
export const GOOGLE = "Google";
export const GREETING = "Greeting";
const GREETING_VISIBLE = "greetingVisible";
export const HELP = "Help";
export const HIDDEN = "hidden";
export const HIDE_BACKGROUND_OVERLAY = "hide-background-overlay";
export const HIDE_VISIBILITY = "m-hide-visibility";
export const HIDE_CONTENT = "hide-content";
export const HOME = "Home";
const HOME_TAB_LOCATION = "homeTabLocation";
export const HOTKEY_HOVER = "hotkey-hover";
const ICONS_ONLY = "iconsOnly";
export const IMAGES = "images";
const INCLUDE_BOOKMARKS_MANAGER = "includeBookmarksManager";
const INCLUDE_MOST_VISITED = "includeMostVisited";
const INCLUDE_OTHER_BOOKMARKS = "includeOtherBookmarks";
export const INPUT_WRAPPER = "input-wrapper";
const KEEP_TODO_STATE = "keepTodoState";
export const LIGHT = "light";
export const LINKS_AND_BOOKMARKS = "Links & Bookmarks";
export const MANTRAS = "Mantras";
const MODERN = "modern";
export const MOZ_EXTENSION = "moz-extension";
export const NAV_ACTIVE = "nav-active";
export const NETWORK_QUEUE = "networkQueue";
export const NIPPLE = "nipple";
export const NIPPLE_BOTTOM_RIGHT = "nipple-bottom-right";
export const NIPPLE_TOP_LEFT = "nipple-top-left";
export const NIPPLE_TOP_RIGHT = "nipple-top-right";
const NONE = "None";
export const NOTES = "Notes";
const NOTES_VISIBLE = "notesVisible";
const NOTES_DESCRIPTION = "Take quick notes and store wisdom to review";
export const ON = "on";
export const ON_TRIAL = "on_trial";
export const OPEN = "open";
const OPEN_IN_NEW_TAB = "openInNewTab";
export const OVERFLOW = "overflow";
const PAST_DUE = "past_due";
export const PHOTOS = "Photos";
export const PHOTO_INFO = "Photo Info";
export const PM = "PM";
export const POPUP = "popup";
export const PRODUCTION = "production";
export const PULSE = "pulse";
export const QUERY_PARAM = "q";
const QUIRKY = "quirky";
export const QUOTES = "Quotes";
const QUOTES_VISIBLE = "quotesVisible";
export const RANDOM = "Random";
export const CUSTOM = "Custom";
const DONE = "Done";
export const INBOX = "Inbox";
const RETRO = "retro";
export const SAFARI = "Safari";
export const SEARCH = "Search";
const SEARCH_VISIBLE = "searchVisible";
export const SEARCH_IN_CENTER = "Search in Center";
export const SERVER = "server";
export const SHIFT_TO_LEFT = "shift-to-left";
export const SHOW = "show";
export const SHOW_ANYWAY = "show-anyway";
export const SHOW_FADE_IN = "show-fade-in";
const SHOW_TODO_LIST = "showTodoList";
export const SHOW_TOP_SITES = "Show Top Sites";
export const SOUNDSCAPES = "Soundscapes";
const SOUNDSCAPES_DESCRIPTION = "Sounds to help you focus and relax";
const SOUNDSCAPES_VISIBLE = "soundscapesVisible";
export const START_IN_TOP_SITES = "Start in Top Sites";
const STARTUP = "startup";
export const STATIC_RESOURCES = "static-resources";
export const STORAGE = "storage";
export const SYSTEM = "system";
const THEME_COLOUR = "themeColour";
const THEME_FONT = "themeFont";
export const TODAY = "Today";
export const TODO = "Todo";
const TODO_LIST = "todo_list";
export const TODO_LIST_DONE_ID = "done";
export const TODO_LIST_INBOX_ID = "inbox";
export const TODO_LIST_TODAY_ID = "today";
const TODO_VISIBLE = "todoVisible";
export const TOKEN = "token";
export const TOP_SITES = "Top Sites";
const TOP_SITES_DESCRIPTION =
	"Show most visited websites by default in Bookmarks Bar";
export const TOP_SITES_PERMISSION = "topSites";
export const TRANSPARENT_COLOUR = "rgba(0, 0, 0, 0)";
const UNPAID = "unpaid";
export const UPSELL_PLUS_GATE = "upsellPlusGate";
export const UPSELL_UPGRADE_PLUS = "upsell.upgrade.plus";
export const URL_ROOT_API = "https://sanchalit.onrender.com";
export const URL_ROOT_DOMAIN = "https://sanchalithome.netlify.app";
export const URL_ACCOUNT_PAGE = `${URL_ROOT_DOMAIN}/account`;
const WAREHOUSE = "warehouse";
const WEB = "web";

export const ONE_SECOND = 1;
export const ONE_MINUTE = ONE_SECOND * 60;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_WEEK = ONE_DAY * 7;
export const ONE_YEAR = ONE_DAY * 365;
export const NOTE_DELETE_TIMEOUT = ONE_WEEK * 2;

const isExtensionBuildTargetSafari = process.env.BUILD_TARGET === "safari";
const isExtensionBuildTargetChromium = process.env.BUILD_TARGET === CHROMIUM;
export const isBuildTargetWeb = process.env.BUILD_TARGET === WEB;

const SOUNDS = {
	fire: {
		name: "Fire",
		icon: fireIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/276f1472-734e-492c-9138-c1584fb6cd80",
	},
	crickets: {
		name: "Crickets",
		icon: cricketsIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/7969c39a-f659-40e3-a357-11060161ce74",
	},
	ocean: {
		name: "Ocean",
		icon: oceanIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/3f851f30-5854-4fdb-805a-3f302ba56a81",
	},
	wind: {
		name: "Wind",
		icon: windIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/ebcb630e-5cb3-4a64-a2d4-eec16c9abf41",
	},
	seagulls: {
		name: "Seagulls",
		icon: seagullsIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/c0b4e5c6-ab66-42ce-aea3-5d6a419583cb",
	},
	tracks: {
		name: "Tracks",
		icon: tracksIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/38228a91-cfa9-45b1-ada9-c16b619c2568",
	},
	rainOnSurface: {
		name: "Rain on surface",
		icon: rainOnSurfaceIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/08e95b57-7dbe-4ba8-83a7-8b19fc254ae1",
	},
	rain: {
		name: "Rain",
		icon: rainIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/eac6cdc4-1f53-4fc5-92dd-0a4c053de028",
	},
	birds: {
		name: "Birds",
		icon: birdsIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/84d9d4e7-1d54-4300-a347-8f2650eafd51",
	},
	insects: {
		name: "Insects",
		icon: insectsIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/5875d483-396c-4bfe-a5d4-160384c18832",
	},
	chimes: {
		name: "Chimes",
		icon: chimesIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/c30b03c9-91e0-43ce-9aa9-199e7aa0b76a",
	},
	cafe: {
		name: "Café",
		icon: cupIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/6f8cf03d-c7f2-45b7-898d-576385236122",
	},
	coffeeMaker: {
		name: "Coffee Maker",
		icon: coffeeMakerIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/43769f50-e91e-4595-91b4-8248372f39d2",
	},
	thunder: {
		name: "Thunder",
		icon: thunderIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/8291e604-c11a-4b45-b844-2e464527a2e1",
	},
	loudRain: {
		name: "Loud Rain",
		icon: loudRainIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/31fca0bf-8792-458f-8c13-f605b5618275",
	},
	stream: {
		name: "Stream",
		icon: streamIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/2374f3af-35fd-4ab8-96c3-5e70775ca33a",
	},
	coWorkers: {
		name: "Co-workers",
		icon: coWorkersIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/7a5fc995-0278-4386-bf30-b5672dfdd95b",
	},
	copier: {
		name: "Copier",
		icon: copierIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/3e1f826c-dca2-4fe7-a10f-bf07c56ecfa8",
	},
	airConditioner: {
		name: "Air Conditioner",
		icon: airConditionerIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/e55e01b5-6fe8-43b3-b50b-18ce4f670472",
	},
	fluorescentHum: {
		name: "Fluorescent Hum",
		icon: fluorescentHumIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/58fdb1ba-8821-4abe-8daf-704ee656e369",
	},
	mechanicalKeyboard: {
		name: "Mechanical Keyboard",
		icon: mechanicalKeyboardIcon,
		url: "https://az814671.vo.msecnd.net/blogimages/f295aec4-9d59-47b2-b31a-ba88f23d4628",
	},
};
export const DASH_APP_STYLES = {
	[_NIPPLE_DISPLACEMENT]: null,
	[_WIDTH]: null,
	[_TOP]: null,
	[_RIGHT]: null,
};
const APP_LOCATION_OPTIONS = [
	{ name: BOOKMARKS, key: BOOKMARKS },
	{ name: DASH, key: DASH },
	{ name: NONE, key: NONE },
];
export const SUBSCRIPTION_STATUS_LIST = [
	{ name: ACTIVE, key: ACTIVE, hasPlus: true },
	{ name: CANCELLED, key: CANCELLED, hasPlus: true },
	{ name: EXPIRED, key: EXPIRED, hasPlus: false },
	{ name: PAST_DUE, key: PAST_DUE, hasPlus: true },
	{ name: UNPAID, key: UNPAID, hasPlus: false },
	{ name: ON_TRIAL, key: ON_TRIAL, hasPlus: true },
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
export const COLOUR_PALETTE_LIST = [
	"rgb(212, 32, 34)",
	"rgb(240, 90, 15)",
	"rgb(255, 170, 0)",
	"rgb(234, 230, 11)",
	"rgb(159, 234, 10)",
	"rgb(64, 220, 25)",
	"rgb(5, 235, 166)",
	"rgb(23, 204, 222)",
	"rgb(20, 167, 235)",
	"rgb(51, 107, 232)",
	"rgb(93, 86, 218)",
	"rgb(153, 0, 153)",
	"rgb(195, 15, 98)",
	"rgb(227, 119, 194)",
	"rgb(230, 230, 230)",
	TRANSPARENT_COLOUR,
];
export const DASH_APP_LIST = [
	{
		name: COUNTDOWNS,
		key: COUNTDOWN_VISIBLE,
		plusOnly: true,
		description: COUNTDOWN_DESCRIPTION,
	},
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
	...DASH_APP_LIST,
	{
		name: NOTES,
		key: NOTES_VISIBLE,
		plusOnly: true,
		description: NOTES_DESCRIPTION,
	},
	{
		name: SOUNDSCAPES,
		key: SOUNDSCAPES_VISIBLE,
		plusOnly: true,
		description: SOUNDSCAPES_DESCRIPTION,
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
		plusOnly: true,
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
	{ value: TODO },
	{ value: BOOKMARKS },
	{ value: HELP, secondary: true },
	{ value: ABOUT, secondary: true },
	{
		value: "Upgrade to Plus",
		secondary: true,
		nonPlusOnly: true,
		clickOnly: true,
		command: UPSELL_UPGRADE_PLUS,
	},
];
export const TODO_FEED_SETTING_LIST = [
	{
		name: "Stay open",
		description: "Stay open on new tab and other usage",
		key: KEEP_TODO_STATE,
	},
];
export const SOUNDSCAPES_SCENE_LIST = [
	{
		name: "Campfire",
		icon: campfireIcon,
		tracks: [
			{
				...SOUNDS.fire,
				volume: 90,
			},
			{
				...SOUNDS.crickets,
				volume: 2,
			},
		],
	},
	{
		name: "Beach",
		icon: beachIcon,
		tracks: [
			{
				...SOUNDS.ocean,
				volume: 50,
			},
			{
				...SOUNDS.wind,
				volume: 15,
			},
			{
				...SOUNDS.seagulls,
				volume: 5,
			},
		],
	},
	{
		name: "Train",
		icon: trainIcon,
		tracks: [
			{
				...SOUNDS.tracks,
				volume: 90,
			},
			{
				...SOUNDS.wind,
				volume: 10,
			},
		],
	},
	{
		name: "Rainfall",
		icon: rainfallIcon,
		tracks: [
			{
				...SOUNDS.rainOnSurface,
				volume: 50,
			},
			{
				...SOUNDS.rain,
				volume: 50,
			},
		],
	},
	{
		name: "Forest",
		icon: forestIcon,
		tracks: [
			{
				...SOUNDS.birds,
				volume: 75,
			},
			{
				...SOUNDS.wind,
				volume: 10,
			},
			{
				...SOUNDS.insects,
				volume: 5,
			},
		],
	},
	{
		name: "Garden",
		icon: gardenIcon,
		tracks: [
			{
				...SOUNDS.chimes,
				volume: 50,
			},
			{
				...SOUNDS.insects,
				volume: 1,
			},
			{
				...SOUNDS.wind,
				volume: 10,
			},
		],
	},
	{
		name: "Café",
		icon: cafeIcon,
		tracks: [
			{
				...SOUNDS.cafe,
				volume: 50,
			},
			{
				...SOUNDS.coffeeMaker,
				volume: 55,
			},
		],
	},
	{
		name: "Thunderstorm",
		icon: thunderstormIcon,
		tracks: [
			{
				...SOUNDS.thunder,
				volume: 90,
			},
			{
				...SOUNDS.loudRain,
				volume: 55,
			},
			{
				...SOUNDS.wind,
				volume: 45,
			},
			{
				...SOUNDS.rain,
				volume: 25,
			},
		],
	},
	{
		name: "Creek",
		icon: creekIcon,
		tracks: [
			{
				...SOUNDS.stream,
				volume: 20,
			},
			{
				...SOUNDS.wind,
				volume: 10,
			},
		],
	},
	{
		name: "Office",
		icon: officeIcon,
		tracks: [
			{
				...SOUNDS.coWorkers,
				volume: 13,
			},
			{
				...SOUNDS.copier,
				volume: 8,
			},
			{
				...SOUNDS.airConditioner,
				volume: 7,
			},
			{
				...SOUNDS.fluorescentHum,
				volume: 3,
			},
			{
				...SOUNDS.mechanicalKeyboard,
				volume: 1,
			},
		],
	},
	{
		name: RANDOM,
		icon: randomIcon,
	},
	{
		name: CUSTOM,
		icon: customIcon,
		tracks: Object.values(SOUNDS),
	},
];
export const QUICK_TIP_LIST = [
	"Sanchalit's Photo, Quote & Mantra change automatically each day.",
	"You can change between a 12 hour or 24 hour clock.",
	"Double-clicking your display name will let you edit it.",
];
const QUOTE_LIST = [
	{
		body: "Life begins at the end of your comfort zone.",
		source: "Neale Donald Walsch",
	},
	{
		body: "We may encounter many defeats but we must not be defeated.",
		source: "Maya Angelou",
	},
	{
		body: "Good judgement comes from experience, and a lot of that comes from bad judgement.",
		source: "Will Rogers",
	},
	{
		body: "Everything you want to be, you already are. You're simply on the path to discovering it.",
		source: "Alicia Keys",
	},
	{
		body: "Luck is what happens when preparation meets opportunity.",
		source: "Seneca",
	},
	{
		body: "Your big opportunity may be right where you are now.",
		source: "Napoleon Hill",
	},
	{
		body: "I would rather die of passion than of boredom.",
		source: "Vincent Van Gogh",
	},
	{
		body: "A year from now you will wish you had started today.",
		source: "Karen Lamb",
	},
	{
		body: "The primary cause of unhappiness is never the situation but your thoughts about it.",
		source: "Eckhart Tolle",
	},
	{
		body: "Everything is possible. The impossible just takes longer.",
		source: "Dan Brown",
	},
	{
		body: "Be the change you wish to see in the world.",
		source: "Mahatma Gandhi",
	},
	{
		body: "Do what you feel in your heart to be right. You’ll be criticized anyway.",
		source: "Eleanor Roosevelt",
	},
	{
		body: "If we wait for the moment when everything, absolutely everything is ready, we shall never begin.",
		source: "Ivan Turgenev",
	},
	{
		body: "It's not the years in your life that count. It's the life in your years.",
		source: "Edward J. Stieglitz",
	},
	{
		body: "If you can remember why you started, then you will know why you must continue.",
		source: "Chris Burkmenn",
	},
	{
		body: "We grow fearless when we do the things we fear.",
		source: "Robin Sharma",
	},
	{
		body: "Simplicity is the ultimate sophistication.",
		source: "Leonardo da Vinci",
	},
	{
		body: "Never let your fear decide your fate.",
		source: 'AWOLNATION, "Kill Your Heroes"',
	},
	{
		body: "Life is a series of building, testing, changing and iterating.",
		source: "Lauren Mosenthal",
	},
];
export const NOTE_DELIGHTER_LIST = [
	"Record some wisdom",
	"This is your canvas",
	"Think of the possibilities...",
	"Type a tidbit",
	"Type something cool!",
	"Use your words",
];

export const UPSELL_LIST = [
	{
		name: "Plus",
		key: UPSELL_PLUS_GATE,
		header: {
			title: "Do more with Plus",
			description: "Add integrations, customization, and new apps.",
		},
		features: [
			{
				title: "Sync with other task managers",
				description:
					"Level up your productivity by syncing your tasks with Asana, Basecamp, Bitbucket, ClickUp, GitHub, Google Tasks, Microsoft To Do, Todoist and Trello.",
				icon: cloudIcon,
			},
			{
				title: "See the photos that inspire you the most",
				description:
					"Light yourself up every time you open a new tab. Add your own images or choose from your Sanchalit favorites.",
				icon: galleryIcon,
			},
			{
				title: "Personalize your experience",
				description:
					"Make Sanchalit your own by choosing a font and color that suits your personality.",
				icon: colourPaletteIcon,
			},
			{
				title: "Focus on your top task",
				description:
					"Auto-set your focus to your top task. Set your priorities at the start of day and work through them one by one.",
				icon: checklistIcon,
			},
			{
				title: "More daily photos and quotes",
				description:
					"Not feeling the photo or quote of the day? Ready for something fresh? A new one is just a click away.",
				icon: arrowRightIcon,
			},
			{
				title: "Improve your task organization",
				description:
					"Add custom to-do lists to better manage your personal productivity and focus.",
				icon: folderIcon1,
			},
		],
	},
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
export const DEFAULT_COUNTDOWN_OBJ = {
	id: "",
	archived: false,
	createdDate: null,
	dueDate: null,
	hasHours: false,
	name: "",
	pinned: false,
	updatedDate: null,
};
export const DEFAULT_NOTE_OBJ = {
	id: "",
	body: "",
	createdDate: null,
	deleted: false,
	empty: true,
	updatedDate: null,
};

export const DEFAULT_TODO_LIST_OBJ = {
	id: "",
	title: "",
	colour: TRANSPARENT_COLOUR,
	createdDate: new Date().toISOString(),
	order: null,
	itemType: TODO_LIST,
	reorder: true,
	ts: new Date().getTime(),
};

export const DEFAULT_TODO_ITEM_OBJ = {
	id: "",
	title: "",
	createdDate: null,
	completedDate: null,
	homeListId: "",
	listId: "",
	order: null,
	done: false,
	today: false,
	ts: null,
};

const TODO_LIST_INBOX = {
	...DEFAULT_TODO_LIST_OBJ,
	id: TODO_LIST_INBOX_ID,
	title: INBOX,
	order: 0,
};
const TODO_LIST_TODAY = {
	...DEFAULT_TODO_LIST_OBJ,
	id: TODO_LIST_TODAY_ID,
	title: TODAY,
	order: 1,
};
const TODO_LIST_DONE = {
	...DEFAULT_TODO_LIST_OBJ,
	id: TODO_LIST_DONE_ID,
	title: DONE,
	order: 2,
};

export const TODO_SHOW_SETTING = {
	name: "Show todo list",
	key: SHOW_TODO_LIST,
};

export const DEFAULT_AUTHENTICATION = {
	email: null,
	fullName: null,
	profilePictureUrl: null,
	subscriptionSummary: {
		startDate: null,
		endDate: null,
		plan: null,
		status: null,
	},
	userId: null,
};

export const DEFAULT_CUSTOMIZATION = {
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
	countdowns: [],
	[COUNTDOWN_VISIBLE]: true,
	displayName: null,
	displayNameVisible: true,
	[GREETING_VISIBLE]: true,
	hour12clock: true,
	notes: [],
	currentNoteId: null,
	[NOTES_VISIBLE]: true,
	quotes: [randomElement(QUOTE_LIST)],
	[QUOTES_VISIBLE]: true,
	[SEARCH_VISIBLE]: true,
	searchSettings: {
		inCenter: true,
		provider: SEARCH_PROVIDER_LIST[0].name,
	},
	showRandomMetricCountdown: false,
	[SOUNDSCAPES_VISIBLE]: true,
	todoLists: [TODO_LIST_INBOX, TODO_LIST_TODAY, TODO_LIST_DONE],
	todos: [],
	todoSettings: {
		activeTodoListId: null,
		[KEEP_TODO_STATE]: false,
		[SHOW_TODO_LIST]: false,
		todosUpdatedDate: null,
	},
	[TODO_VISIBLE]: true,
	topSites: [],
	[THEME_COLOUR]: SYSTEM,
	[THEME_FONT]: CLASSIC,
};

export const CUSTOMIZATION_FREEMIUM_CONFIGURATION = {
	[COUNTDOWN_VISIBLE]: false,
	[NOTES_VISIBLE]: false,
	[SOUNDSCAPES_VISIBLE]: false,
	[THEME_FONT]: CLASSIC,
};

export const DEFAULT_NETWORK_QUEUE = {
	post: {
		userData: {},
	},
	delete: {
		countdown: {},
		note: {},
		todoList: {},
		todo: {},
	},
};
