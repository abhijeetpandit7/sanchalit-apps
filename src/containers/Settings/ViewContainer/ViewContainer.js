import React, { lazy, Suspense } from "react";
import { ABOUT, GENERAL, HELP, SETTINGS_NAV_LIST } from "../../../utils";

const About = lazy(() => import("./Views/About/About"));
const General = lazy(() => import("./Views/General/General"));
const Help = lazy(() => import("./Views/Help/Help"));

const getNavItemValue = (navItem) =>
	SETTINGS_NAV_LIST.find(({ value }) => value === navItem).value;

const SETTINGS_VIEW_LIST = [
	{
		value: getNavItemValue(GENERAL),
		component: <General />,
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
