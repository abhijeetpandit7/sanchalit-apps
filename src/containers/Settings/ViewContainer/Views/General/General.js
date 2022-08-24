import React from "react";
import { toggleSwitch } from "../../../../../utils";

const General = () => (
	<div id="settings-general" className="settings-view settings-general">
		<header className="settings-header">
			<h3>General</h3>
			<p className="description">Customize your dashboard</p>
		</header>

		<h4 className="first">Show</h4>
		<ul id="apps-list" className="settings-list options-list">
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Links</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle">
				<input type="checkbox" />
				<span className="setting-name">Bookmarks Bar</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle">
				<input type="checkbox" />
				<span className="setting-name">Top Sites</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Show most visited websites by default in Bookmarks Bar
				</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Search</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Weather</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Clock</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Greeting</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle">
				<input type="checkbox" />
				<span className="setting-name">Mantras</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Simple phrases to build positive mental habits
				</span>
			</li>
			<li className="slide-toggle has-toggle">
				<input type="checkbox" />
				<span className="setting-name">Focus</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Todo</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Quotes</span>
				<span className="toggle-slider">{toggleSwitch}</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Countdowns</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Count down to important dates and deadlines
				</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Metrics</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Keep your important metrics at a glance
				</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Notes</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Take quick notes and store wisdom to review
				</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">World Clocks</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Keep track of time anywhere on Earth
				</span>
			</li>
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Soundscapes</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="badge badge-plus">PREVIEW</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Sounds to help you focus and relax
				</span>
			</li>
		</ul>

		<h4>Labs</h4>
		<ul id="labs-list" className="settings-list options-list">
			<li className="slide-toggle has-toggle on">
				<input type="checkbox" />
				<span className="setting-name">Search in Center</span>
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="option-message">
					Enable toggling between Search and Focus in the center
				</span>
			</li>
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
