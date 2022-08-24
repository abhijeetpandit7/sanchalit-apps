import React from "react";
import {
	ABOUT,
	BALANCE,
	GENERAL,
	HELP,
	LINKS_AND_BOOKMARKS,
	MANTRAS,
	PHOTOS,
	QUOTES,
	SETTINGS_NAV_LIST,
	TODO,
} from "../../../utils";

const getNavItemValue = (navItem) =>
	SETTINGS_NAV_LIST.find(({ value }) => value === navItem).value;

const SETTINGS_VIEW_LIST = [
	{
		value: getNavItemValue(GENERAL),
	},
	{ value: getNavItemValue(GENERAL) },
	{ value: getNavItemValue(TODO) },
	{ value: getNavItemValue(MANTRAS) },
	{ value: getNavItemValue(PHOTOS) },
	{ value: getNavItemValue(QUOTES) },
	{ value: getNavItemValue(LINKS_AND_BOOKMARKS) },
	{ value: getNavItemValue(BALANCE) },
	{ value: getNavItemValue(HELP) },
	{ value: getNavItemValue(ABOUT) },
];

export const ViewContainer = ({ activeNav }) => (
	<div className="settings-view-container-wrapper">
		<div className="settings-view-container">
				{SETTINGS_VIEW_LIST.find(({ value }) => value === activeNav).component}
		</div>
	</div>
);
