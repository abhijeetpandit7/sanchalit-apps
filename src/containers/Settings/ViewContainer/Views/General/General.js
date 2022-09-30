import React, { memo } from "react";
import { ToggleOptions, ToggleSlider } from "../../../../../components/";
import { useUserActions, useUserCustomization } from "../../../../../hooks";
import {
	SEARCH_IN_CENTER,
	GENERAL_SETTING_APP_LIST,
	GENERAL_SETTING_APPEARANCE_LIST,
} from "../../../../../utils";

const ContextMemo = memo((props) => (
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
					toggle={() => props.toggleShowApp(app)}
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
				toggle={props.toggleSearchInCenter}
			/>
		</ul>

		<h4>Appearance</h4>
		<ul id="customize-list" className="settings-list options-list">
			{GENERAL_SETTING_APPEARANCE_LIST.map((setting) => (
				<ToggleOptions
					key={setting.key}
					keyValue={setting.key}
					value={props[setting.key]}
					toggle={props.selectGeneralSetting}
					{...setting}
				/>
			))}
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
));

const General = () => {
	const {
		storageUserCustomization: {
			bookmarksVisible,
			bookmarksSettings: { defaultMostVisited },
			clockVisible,
			greetingVisible,
			notesVisible,
			quotesVisible,
			searchSettings: { inCenter },
			searchVisible,
			themeColour,
			themeFont,
			todoVisible,
		},
	} = useUserCustomization();
	const { selectGeneralSetting, toggleSearchInCenter, toggleShowApp } =
		useUserActions();

	return (
		<ContextMemo
			{...{
				bookmarksVisible,
				clockVisible,
				greetingVisible,
				inCenter,
				defaultMostVisited,
				notesVisible,
				quotesVisible,
				searchVisible,
				themeColour,
				themeFont,
				todoVisible,
				selectGeneralSetting,
				toggleSearchInCenter,
				toggleShowApp,
			}}
		/>
	);
};

export default General;
