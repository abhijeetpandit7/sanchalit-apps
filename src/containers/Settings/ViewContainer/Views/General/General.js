import React, { memo } from "react";
import { ToggleOptions, ToggleSlider } from "../../../../../components/";
import {
	useAuth,
	useUserActions,
	useUserCustomization,
} from "../../../../../hooks";
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
					toggle={() => props.toggleShowApp(app, props.hasPlus)}
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
					hasPlus={props.hasPlus}
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
		storageAuth: {
			subscriptionSummary: { plan },
		},
	} = useAuth();
	const {
		storageUserCustomization: {
			bookmarksVisible,
			bookmarksSettings: { defaultMostVisited },
			clockVisible,
			countdownVisible,
			greetingVisible,
			notesVisible,
			quotesVisible,
			searchSettings: { inCenter },
			searchVisible,
			soundscapesVisible,
			themeColour,
			themeFont,
			todoVisible,
		},
	} = useUserCustomization();
	const { selectGeneralSetting, toggleSearchInCenter, toggleShowApp } =
		useUserActions();
	const hasPlus = !!plan;

	return (
		<ContextMemo
			{...{
				bookmarksVisible,
				clockVisible,
				countdownVisible,
				greetingVisible,
				inCenter,
				defaultMostVisited,
				notesVisible,
				hasPlus,
				quotesVisible,
				searchVisible,
				soundscapesVisible,
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
