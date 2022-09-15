import React, { memo } from "react";
import { ToggleSlider } from "../../../../../components/";
import { useUserActions, useUserCustomization } from "../../../../../hooks";
import {
	SEARCH,
	SEARCH_IN_CENTER,
	GENERAL_SETTING_APP_LIST,
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
					toggle={() => props.toggleShowApp(app.key)}
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
			clockVisible,
			greetingVisible,
			notesVisible,
			quotesVisible,
			searchSettings: { inCenter },
			searchVisible,
			todoVisible,
		},
	} = useUserCustomization();
	const { toggleSearchInCenter, toggleShowApp } = useUserActions();

	return (
		<ContextMemo
			{...{
				clockVisible,
				greetingVisible,
				inCenter,
				notesVisible,
				quotesVisible,
				searchVisible,
				todoVisible,
				toggleSearchInCenter,
				toggleShowApp,
			}}
		/>
	);
};

export default General;
