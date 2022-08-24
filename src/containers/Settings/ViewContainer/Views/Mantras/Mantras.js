import React from "react";
import { CollapsibleHeaderWrapper } from "../../../../../components";
import {
	cancelIcon,
	filledHeartIcon,
	pinIcon,
	toggleSwitch,
	trashIcon,
} from "../../../../../utils";

const CollapsibleContent = () => (
	<>
		<h4>General</h4>
		<ul className="settings-list options-list">
			<li className="slide-toggle has-toggle mantras-enabled on">
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="setting-name">Enable Mantras</span>
				<span className="option-message">
					Show mantras periodically throughout the day
				</span>
			</li>
			<li className="slide-toggle has-toggle frequencies">
				<span className="toggle-options">
					<span className="toggle-option frequency">
						<span className="toggle-label">Rarely</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option frequency">
						<span className="toggle-label">Often</span>
					</span>
					<span className="toggle-divider">|</span>
					<span className="toggle-option frequency active">
						<span className="toggle-label">Always</span>
					</span>
				</span>
				<span className="setting-name">Frequency</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="option-message">
					How often mantras appear in place of daily greetings
				</span>
			</li>
		</ul>
		<h4>Feeds</h4>
		<ul className="feeds settings-list options-list">
			<li className="slide-toggle has-toggle momo on">
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="setting-name">Sanchalit Mantras</span>
				<span className="option-message">
					See a daily mantra from our curated feed
				</span>
			</li>
			<li className="slide-toggle has-toggle custom">
				<span className="toggle-slider">{toggleSwitch}</span>
				<span className="setting-name">My Mantras</span>
				<span className="badge badge-plus">PLUS</span>
				<span className="option-message">
					Personalize with your own mantras, skip and pin mantras, and more!
				</span>
			</li>
		</ul>
	</>
);

const Mantras = () => (
	<div
		id="settings-mantras"
		className="settings-view settings-content settings-mantras"
	>
		<div className="main-container">
			<CollapsibleHeaderWrapper
				header="Mantras"
				description="Simple phrases to build positive mental habits"
			>
				<CollapsibleContent />
			</CollapsibleHeaderWrapper>

			<nav className="settings-subnav" style={{ display: "flex" }}>
				<div className="subnav-titles">
					<h4 className="customs active">My Mantras</h4>
					<h4 className="favs">Favorites</h4>
					<h4 className="history">History</h4>
				</div>
				<button className="button list-add-button">
					+ Add<span className="u--touch-hide"> Mantra</span>
				</button>
			</nav>

			<div className="settings-subnav-placeholder"></div>
			<div className="list-wrapper has-subnav" style={{ display: "block" }}>
				<div className="settings-loading">
					<p className="settings-empty-loading">
						<i className="loading-icon"></i>Loading...
					</p>
				</div>
				<div
					className="list-body mantra-list-body custom-wrapper"
					style={{ display: "block" }}
				>
					<form className="settings-form-basic list-add-form show">
						<div className="settings-form-row">
							<input
								className="list-add-input"
								placeholder="Mantra"
								maxLength="100"
								autoComplete="off"
							/>
							<span className="char-count warn" style={{ display: "inline" }}>
								80
							</span>
							<span className="cancel u--clickable">
								<span className="icon-wrapper">{cancelIcon}</span>
							</span>
						</div>
						<span className="suggestions-section">
							<span className="suggestions-label u--clickable">
								Suggestions
							</span>
							<span className="suggestions-wrapper show">
								<span className="suggestion available show" data-index="0">
									<span className="body u--clickable">Choose love.</span>
									<span className="remove u--clickable" title="Hide suggestion">
										<span className="icon-wrapper">{cancelIcon}</span>
									</span>
								</span>
								<span className="suggestion added" data-index="1">
									<span className="body u--clickable">Create every day.</span>
									<span className="remove u--clickable" title="Hide suggestion">
										<span className="icon-wrapper">{cancelIcon}</span>
									</span>
								</span>
								<span className="suggestion available show" data-index="2">
									<span className="body u--clickable">Do more with less.</span>
									<span className="remove u--clickable" title="Hide suggestion">
										<span className="icon-wrapper">{cancelIcon}</span>
									</span>
								</span>
								<span className="suggestion removed" data-index="3">
									<span className="body u--clickable">Do your best.</span>
									<span className="remove u--clickable" title="Hide suggestion">
										<span className="icon-wrapper">{cancelIcon}</span>
									</span>
								</span>
								<span className="suggestion available show" data-index="4">
									<span className="body u--clickable">Drink water.</span>
									<span className="remove u--clickable" title="Hide suggestion">
										<span className="icon-wrapper">{cancelIcon}</span>
									</span>
								</span>
								<span className="suggestion available" data-index="5">
									<span className="body u--clickable">
										Love overcomes fear.
									</span>
									<span className="remove u--clickable" title="Hide suggestion">
										<span className="icon-wrapper">{cancelIcon}</span>
									</span>
								</span>
							</span>
							<span className="suggestions-empty">No more suggestions</span>
						</span>
					</form>

					<ul
						className="settings-list custom-list"
						style={{ display: "block" }}
					>
						<li className="content-item mantra-item">
							<div className="view">
								<div className="mantra">
									<span className="mantra-body u--selectable">
										Create every day.
									</span>
								</div>

								<span className="controls">
									<span
										className="control control-svg control-activate u--clickable"
										title="Activate for today"
									>
										<i className="icon-check"></i>
									</span>
									<span
										className="control control-svg control-pin u--clickable"
										title="Pin"
									>
										{pinIcon}
									</span>
									<span
										className="control control-svg control-heart u--clickable "
										title="Favorite"
									>
										{filledHeartIcon}
									</span>
									<span
										className="control control-edit u--clickable"
										title="Edit"
									>
										<i className="icon-edit"></i>
									</span>
									<span
										className="control control-delete u--clickable"
										title="Delete"
									>
										{trashIcon}
									</span>
								</span>
							</div>

							<form className="edit settings-form-basic list-edit-form">
								<input
									className="list-edit-input"
									placeholder="Mantra"
									defaultValue="Create every day."
									maxLength="100"
									autoComplete="off"
								/>
								<span className="char-count"></span>
								<span className="cancel u--clickable">
									<span className="icon-wrapper">{cancelIcon}</span>
								</span>
							</form>
						</li>
					</ul>

					<div
						className="settings-empty custom-empty"
						// style={{ display: "none" }}
					>
						<p className="settings-empty-title empty-add-shortcut">
							Get inspired by adding your personal mantras
						</p>
						<p className="settings-empty-description empty-add-shortcut">
							Click + Add Mantra to get started
						</p>
					</div>
				</div>

				<div
					className="list-body mantra-list-body favs-wrapper"
					style={{ display: "block" }}
				>
					<ul className="settings-list favs-list" style={{ display: "block" }}>
						<li className="content-item mantra-item active">
							<div className="view">
								<div className="mantra">
									<span className="mantra-body u--selectable">
										Create every day.
									</span>
								</div>
								<span className="controls">
									<span
										className="control control-svg control-activate u--clickable active"
										title="(Active for today)"
									>
										<i className="icon-check"></i>
									</span>
									<span
										className="control control-svg control-pin u--clickable"
										title="Pin"
									>
										{pinIcon}
									</span>
									<span
										className="control control-svg control-heart u--clickable active"
										title="Unfavorite"
									>
										{filledHeartIcon}
									</span>
								</span>
							</div>
							<form className="edit settings-form-basic list-edit-form">
								<input
									className="list-edit-input"
									placeholder="Mantra"
									defaultValue="Create every day."
									maxLength="100"
									autoComplete="off"
								/>
								<span className="char-count"></span>
								<span className="cancel u--clickable">
									<span className="icon-wrapper">{cancelIcon}</span>
								</span>
							</form>
						</li>
						<li className="content-item mantra-item">
							<div className="view">
								<div className="mantra">
									<span className="mantra-body u--selectable">Do it now.</span>
								</div>
								<span className="controls">
									<span
										className="control control-svg control-activate u--clickable"
										title="Activate for today"
									>
										<i className="icon-check"></i>
									</span>
									<span
										className="control control-svg control-pin u--clickable"
										title="Pin"
									>
										{pinIcon}
									</span>
									<span
										className="control control-svg control-heart u--clickable active"
										title="Unfavorite"
									>
										{filledHeartIcon}
									</span>
								</span>
							</div>
							<form className="edit settings-form-basic list-edit-form">
								<input
									className="list-edit-input"
									placeholder="Mantra"
									defaultValue="Do it now."
									maxLength="100"
									autoComplete="off"
								/>
								<span className="char-count"></span>
								<span className="cancel u--clickable">
									<span className="icon-wrapper">{cancelIcon}</span>
								</span>
							</form>
						</li>
					</ul>
					<div
						className="settings-empty favs-empty"
						// style={{ display: "none" }}
					>
						<p className="settings-empty-title">No favorite mantras</p>
						<p className="settings-empty-description">
							Click the heart icon on a mantra to start your collection
						</p>
					</div>
				</div>

				<div className="list-body mantra-list-body history-wrapper">
					<ul
						className="settings-list history-list"
						style={{ display: "block" }}
					>
						<li className="content-item mantra-item active">
							<div className="view" title="Aug 23">
								<div className="mantra">
									<span className="mantra-body u--selectable">Rise above.</span>
								</div>
								<span className="controls">
									<span
										className="control control-svg control-activate u--clickable active"
										title="(Active for today)"
									>
										<i className="icon-check"></i>
									</span>
									<span
										className="control control-svg control-pin u--clickable"
										title="Pin"
									>
										{pinIcon}
									</span>
									<span
										className="control control-svg control-heart u--clickable "
										title="Favorite"
									>
										{filledHeartIcon}
									</span>
								</span>
							</div>
							<form className="edit settings-form-basic list-edit-form">
								<input
									className="list-edit-input"
									placeholder="Mantra"
									defaultValue="Rise above."
									maxLength="100"
									autoComplete="off"
								/>
								<span className="char-count"></span>
								<span className="cancel u--clickable">
									<span className="icon-wrapper">{cancelIcon}</span>
								</span>
							</form>
						</li>
						<li className="content-item mantra-item">
							<div className="view" title="Aug 8">
								<div className="mantra">
									<span className="mantra-body u--selectable">
										Inhale love. Exhale gratitude.
									</span>
								</div>
								<span className="controls">
									<span
										className="control control-svg control-activate u--clickable"
										title="Activate for today"
									>
										<i className="icon-check"></i>
									</span>
									<span
										className="control control-svg control-pin u--clickable"
										title="Pin"
									>
										{pinIcon}
									</span>
									<span
										className="control control-svg control-heart u--clickable "
										title="Favorite"
									>
										{filledHeartIcon}
									</span>
								</span>
							</div>
							<form className="edit settings-form-basic list-edit-form">
								<input
									className="list-edit-input"
									placeholder="Mantra"
									defaultValue="Inhale love. Exhale gratitude."
									maxLength="100"
									autoComplete="off"
								/>
								<span className="char-count"></span>
								<span className="cancel u--clickable">
									<span className="icon-wrapper">{cancelIcon}</span>
								</span>
							</form>
						</li>
					</ul>
					<div className="settings-empty history-empty">
						<p className="settings-empty-title">
							You will see your past mantras here
						</p>
						<p className="settings-empty-description">
							Can't find any history for this account
						</p>
					</div>
				</div>
			</div>
			<div className="off-state" style={{ display: "block" }}>
				<span className="button mantras-enabled on">Enable Mantras</span>
			</div>
		</div>

		<div className="settings-mantras-onboard">
			<div>
				<h3>Introducing Mantras</h3>
				<div className="text-wrapper">
					<p className="text">
						Build positive mental habits with simple phrases known as mantras.
						Mantras will appear throughout the day in place of the
						<span className="current-greeting"> Good morning, Abhijeet </span>
						greeting.
					</p>
					<p className="text">
						Center yourself with friendly reminders, reinforce new thought
						patterns, and bring attention to the values or principles that are
						most important to you.
					</p>
				</div>
				<button className="hide-onboard button button-primary">
					Get Started
				</button>
			</div>
		</div>
	</div>
);

export default Mantras;
