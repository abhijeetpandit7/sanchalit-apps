import React, { memo, useEffect, useState } from "react";
import {
	DASH,
	EDGE,
	HOME_TAB_OBJ,
	APPS_OBJ,
	appsIcon,
	chromeIcon,
	edgeIcon,
	getBrowserType,
} from "../../utils";

const ContextMemo = memo(({ showApps, showHomeTab, openInNewTab }) => {
	const [dashLinks, setDashLinks] = useState([]);

	useEffect(() => {
		let homeTab = HOME_TAB_OBJ;
		let browserApp = APPS_OBJ;
		let links = [];

		if (showHomeTab) {
			const browserType = getBrowserType().name;
			homeTab.title = `${browserType} Tab`;
			homeTab.icon = browserType === EDGE ? edgeIcon : chromeIcon;
			links.push(homeTab);
		}
		if (showApps) {
			browserApp.icon = appsIcon;
			links.push(browserApp);
		}

		setDashLinks(links);
	}, [showApps, showHomeTab]);

	return (
		<div id="dashlinks" className="dashlinks app-container">
			{dashLinks.map((dash) => (
				<span
					className="app-dash dashlinks-icon-wrapper"
					title={dash.title}
					key={dash.id}
					onClick={() =>
						openInNewTab
							? chrome.tabs.create({ url: dash.url, active: false })
							: chrome.tabs.update({ url: dash.url })
					}
				>
					{dash.icon}
				</span>
			))}
		</div>
	);
});

export default ContextMemo;
