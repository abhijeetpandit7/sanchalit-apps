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
			<ToggleSlider name="Links" value={true} />
			<ToggleSlider name="Bookmarks Bar" />
			<ToggleSlider
				name="Top Sites"
				message="Show most visited websites by default in Bookmarks Bar"
			/>
			<ToggleSlider name="Search" />
			<ToggleSlider name="Weather" />
			<ToggleSlider name="Clock" />
			<ToggleSlider name="Greeting" />
			<ToggleSlider
				name="Mantras"
				message="Simple phrases to build positive mental habits"
			/>
			<ToggleSlider name="Focus" />
			<ToggleSlider name="Todo" />
			<ToggleSlider name="Quotes" />
			<ToggleSlider
				name="Countdowns"
				plus={true}
				message="Count down to important dates and deadlines"
			/>
			<ToggleSlider
				name="Metrics"
				plus={true}
				message="Keep your important metrics at a glance"
			/>
			<ToggleSlider
				name="Notes"
				plus={true}
				message="Take quick notes and store wisdom to review"
			/>
			<ToggleSlider
				name="World Clocks"
				plus={true}
				message="Keep track of time anywhere on Earth"
			/>
			<ToggleSlider
				name="Soundscapes"
				plus={true}
				preview={true}
				message="Sounds to help you focus and relax"
			/>
		</ul>

		<h4>Labs</h4>
		<ul id="labs-list" className="settings-list options-list">
			<ToggleSlider
				name="Search in Center"
				message="Enable toggling between Search and Focus in the center"
			/>
		</ul>

		<h4>Appearance</h4>
		<ul id="customize-list" className="settings-list options-list">
			<li className="slide-toggle has-toggle">
				<span className="setting-name">Theme</span>
				<span className="toggle-options">
					<span className="toggle-option themeColour">
						<div className="sub-view"></div>
						<span className="toggle-label">Dark</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option themeColour">
						<div className="sub-view"></div>
						<span className="toggle-label">Light</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option themeColour active">
						<div className="sub-view"></div>
						<span className="toggle-label">System</span>
					</span>
					<br />
					<span className="toggle-option themeColour">
						<div className="sub-view"></div>
						<span className="toggle-label">Photo Match</span>
						<span className="badge badge-plus">PLUS</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option themeColour">
						<div data-v-a62956c0 className="color-picker-wrapper sub-view">
							<span data-v-a62956c0 className="toggle-label">
								<span
									data-v-a62956c0
									className="preview"
									style={{ backgroundColor: "rgb(9, 122, 28)" }}
								></span>
								<span data-v-a62956c0>Custom</span>
							</span>
						</div>
						<span className="toggle-label"></span>
						<span className="badge badge-plus">PLUS</span>
					</span>
				</span>

				<div className="option-clear"></div>
			</li>
			<li className="slide-toggle has-toggle">
				<span className="setting-name">Font</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="toggle-options">
					<span className="toggle-option themeFont active">
						<div className="sub-view"></div>
						<span className="toggle-label">Classic</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option themeFont">
						<div className="sub-view"></div>
						<span className="toggle-label">Modern</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option themeFont">
						<div className="sub-view"></div>
						<span className="toggle-label">Startup</span>
					</span>
					<br />
					<span className="toggle-option themeFont">
						<div className="sub-view"></div>
						<span className="toggle-label">Retro</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option themeFont">
						<div className="sub-view"></div>
						<span className="toggle-label">Warehouse</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option themeFont">
						<div className="sub-view"></div>
						<span className="toggle-label">Quirky</span>
					</span>
				</span>
				<div className="option-clear"></div>
			</li>
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
