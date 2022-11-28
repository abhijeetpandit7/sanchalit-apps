import React, { lazy, memo, Suspense } from "react";
import { useUserCustomization } from "./../../hooks";
import { COUNTDOWNS, DASH_APP_LIST } from "./../../utils";

const Countdowns = lazy(() => import("./Apps/Countdowns/Countdowns"));

const getDashAppName = (dashApp) =>
	DASH_APP_LIST.find(({ name }) => name === dashApp).name;

const DASH_APP_COMPONENT_LIST = [
	{
		name: getDashAppName(COUNTDOWNS),
		component: <Countdowns />,
	},
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

const ContextMemo = memo(({ dashAppRef, app, styles }) => {
	// TODO: Parse app overflow
	return (
		<div
			className="app popup nipple display-bottom display-left nipple-top-right"
			style={styles}
			ref={dashAppRef}
			data-v-f48f9f48
			data-v-6eb8778d
		>
			<div
				className="resize-wrapper view-container tr-height"
				data-v-0f8972b1
				data-v-d653fa6c
				data-v-f48f9f48
				data-v-6eb8778d
			>
				<Suspense fallback={<Loading />}>
					{DASH_APP_COMPONENT_LIST.find(({ name }) => name === app).component}
				</Suspense>
			</div>
		</div>
	);
});

export const DashApp = () => {
	const { dashAppRef, widgetManager } = useUserCustomization();

	const { app, styles } = widgetManager.dashApp;

	return app !== null && <ContextMemo {...{ dashAppRef, app, styles }} />;
};
