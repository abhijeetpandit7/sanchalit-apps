import React, { memo } from "react";
import { ToggleSlider } from "../../../../../components/";
import { useUserCustomization } from "../../../../../hooks";
import {
	SEARCH,
	SEARCH_IN_CENTER,
	GENERAL_SETTING_APP_LIST,
} from "../../../../../utils";

const ContextMemo = memo((props) => {
	const toggleApp = (app) =>
		props.setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			[app]: !prevCustomization[app],
		}));

	const toggleSearchInCenter = () => {
		if (props.inCenter === false && props.searchVisible === false)
			toggleApp(
				GENERAL_SETTING_APP_LIST.find((app) => app.name === SEARCH).key,
			);
		props.setStorageUserCustomization((prevCustomization) => ({
			...prevCustomization,
			searchSettings: {
				...prevCustomization.searchSettings,
				inCenter: !prevCustomization.searchSettings.inCenter,
			},
		}));
	};

	return (
		<div id="settings-general" className="settings-view settings-general">
			<header className="settings-header">
				<h3>General</h3>
				<p className="description">Customize your dashboard</p>
			</header>

			<h4 className="first">Show</h4>
			<ul id="apps-list" className="settings-list options-list">
				{GENERAL_SETTING_APP_LIST.map((app) => (
					<ToggleSlider
						key={app.name}
						toggle={() => toggleApp(app.key)}
						value={props[app.key]}
						{...app}
					/>
				))}
			</ul>

			<h4>Labs</h4>
			<ul id="labs-list" className="settings-list options-list">
				<ToggleSlider
					name={SEARCH_IN_CENTER}
					value={props.inCenter}
					toggle={toggleSearchInCenter}
				/>
			</ul>

			<section className="u--touch-hide">
				<h5>Tip</h5>
				<p className="tip">
					Many items in Sanchalit can be edited by double-clicking on them,
					including <strong>your name</strong> and your
					<strong> to-dos</strong>.
				</p>
			</section>
		</div>
	);
});

const General = () => {
	const { storageUserCustomization, setStorageUserCustomization } =
		useUserCustomization();
	const {
		clockVisible,
		greetingVisible,
		notesVisible,
		quotesVisible,
		searchSettings,
		searchVisible,
		todoVisible,
	} = storageUserCustomization;
	const { inCenter } = searchSettings;

	return (
		<ContextMemo
			{...{
				clockVisible,
				greetingVisible,
				inCenter,
				notesVisible,
				quotesVisible,
				searchVisible,
				setStorageUserCustomization,
				todoVisible,
			}}
		/>
	);
};

export default General;
