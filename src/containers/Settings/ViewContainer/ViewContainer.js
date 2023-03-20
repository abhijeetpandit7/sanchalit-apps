import React, { lazy, Suspense } from "react";
import {
	ABOUT,
	BOOKMARKS,
	GENERAL,
	HELP,
	TODO,
	SETTINGS_NAV_LIST,
} from "../../../utils";

const About = lazy(() => import("./Views/About/About"));
const Bookmarks = lazy(() => import("./Views/Bookmarks/Bookmarks"));
const General = lazy(() => import("./Views/General/General"));
const Help = lazy(() => import("./Views/Help/Help"));
const Todo = lazy(() => import("./Views/Todo/Todo"));

const getNavItemValue = (navItem) =>
	SETTINGS_NAV_LIST.find(({ value }) => value === navItem).value;

const SETTINGS_VIEW_LIST = [
	{
		value: getNavItemValue(GENERAL),
		component: <General />,
	},
	{ value: getNavItemValue(TODO), component: <Todo /> },
	{
		value: getNavItemValue(BOOKMARKS),
		component: <Bookmarks />,
	},
	{ value: getNavItemValue(HELP), component: <Help /> },
	{ value: getNavItemValue(ABOUT), component: <About /> },
];

const Loading = () => (
	<div className="u--flex-center cp-alpha">
		<div className="loading">
			<p className="settings-empty-loading">
				<i className="loading-icon"></i>
				Loading...
			</p>
		</div>
	</div>
);

export const ViewContainer = ({ activeNav }) => (
	<div className="settings-view-container-wrapper">
		<div className="settings-view-container">
			<Suspense fallback={<Loading />}>
				{SETTINGS_VIEW_LIST.find(({ value }) => value === activeNav).component}
			</Suspense>
		</div>
	</div>
);
