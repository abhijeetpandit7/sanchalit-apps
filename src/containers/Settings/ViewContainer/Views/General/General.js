import React from "react";
import { ToggleSlider } from "../../../../../components/";

const General = () => (
	<div id="settings-general" className="settings-view settings-general">
		<header className="settings-header">
			<h3>General</h3>
			<p className="description">Customize your dashboard</p>
		</header>

		<h4 className="first">Show</h4>
		<ul id="apps-list" className="settings-list options-list">
			<ToggleSlider name="Search" />
			<ToggleSlider name="Clock" />
			<ToggleSlider name="Greeting" />
			<ToggleSlider name="Todo" />
			<ToggleSlider name="Quotes" />
			<ToggleSlider
				name="Notes"
				plus={true}
				message="Take quick notes and store wisdom to review"
			/>
		</ul>

		<h4>Labs</h4>
		<ul id="labs-list" className="settings-list options-list">
			<ToggleSlider
				name="Search in Center"
				message="Enable toggling between Search and Focus in the center"
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

export default General;
