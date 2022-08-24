import React, { useState } from "react";
import { FocusOutHandler, useUserCustomization } from "../../hooks";
import { Navbar, UserActions, ViewContainer } from "../Settings";
import {
	NAV_ACTIVE,
	SETTINGS_NAV_LIST,
	toggleIcon,
	toggleAppPopup,
} from "../../utils";

const APP = "app";
const SETTINGS_APP = "settings-app";

export const Settings = () => {
	const { settingsRef } = useUserCustomization();
	const [activeNav, setActiveNav] = useState(SETTINGS_NAV_LIST[0].value);
	const [componentDidMount, setComponentDidMount] = useState(false);

	FocusOutHandler({ ref: settingsRef });

	const toggleSettingsApp = () => {
		toggleAppPopup(settingsRef);
		setComponentDidMount(true);
	};

	const SettingsApp = (
		<div className={`${APP} ${SETTINGS_APP}`}>
			<Navbar
				activeNav={activeNav}
				setActiveNav={setActiveNav}
			>
				<UserActions
				/>
			</Navbar>
			<ViewContainer activeNav={activeNav} />
		</div>
	);

	return (
		<div id="settings" className="app-container settings" ref={settingsRef}>
			<div className="app-wrapper nipple nipple-bottom-left">
				{componentDidMount && SettingsApp}
			</div>
			<span className="app-dash toggle" onClick={toggleSettingsApp}>
				{toggleIcon}
			</span>
		</div>
	);
};
