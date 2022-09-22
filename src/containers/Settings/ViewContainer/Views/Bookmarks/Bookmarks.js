import React, { memo } from "react";
import {
	CollapsibleHeaderWrapper,
	ToggleOptions,
	ToggleSlider,
} from "../../../../../components";
import { useUserActions, useUserCustomization } from "../../../../../hooks";
import {
	BOOKMARKS,
	BOOKMARKS_FEED_SETTING_LIST,
	BOOKMARKS_GENERAL_SETTING_LIST,
	GENERAL_SETTING_APP_LIST,
} from "../../../../../utils";

const ContextMemo = memo((props) => {
	const toggleShowBookmarks = () =>
		props.toggleShowApp(
			GENERAL_SETTING_APP_LIST.find((app) => app.name === BOOKMARKS),
		);

	const CollapsibleContent = () => (
		<>
			<h4>General</h4>
			<ul className="settings-list options-list">
				<ToggleSlider
					name="Enable Bookmarks"
					description="Show bookmarks you've saved over time in your browser"
					value={props.bookmarksVisible}
					toggle={toggleShowBookmarks}
				/>
			</ul>
		</>
	);

	return (
		<div id="settings-bookmarks" className="settings-view settings-bookmarks">
			<div className="main-container">
				<CollapsibleHeaderWrapper
					header="Bookmarks"
					description="Quick access to your favorite links"
				>
					<CollapsibleContent />
				</CollapsibleHeaderWrapper>

				{props.bookmarksVisible ? (
					<>
						<ul className="settings-list options-list">
							{BOOKMARKS_FEED_SETTING_LIST.map((setting) =>
								setting.toggleOptions ? (
									<ToggleOptions
										key={setting.key}
										keyValue={setting.key}
										value={props[setting.key]}
										toggle={props.selectBookmarksSetting}
										{...setting}
									/>
								) : (
									<ToggleSlider
										key={setting.key}
										value={props[setting.key]}
										toggle={() => props.toggleBookmarksSetting(setting)}
										{...setting}
									/>
								),
							)}
						</ul>

						<div className="section section-bookmarks">
							<h4>Bookmarks Bar</h4>
							<ul className="settings-list options-list">
								{BOOKMARKS_GENERAL_SETTING_LIST.map((setting) => (
									<ToggleSlider
										key={setting.key}
										value={props[setting.key]}
										toggle={() => props.toggleBookmarksSetting(setting)}
										{...setting}
									/>
								))}
							</ul>
						</div>
					</>
				) : (
					<div className="off-state">
						<span className="button" onClick={toggleShowBookmarks}>
							Enable Bookmarks
						</span>
					</div>
				)}
			</div>
		</div>
	);
});

const Bookmarks = () => {
	const {
		storageUserCustomization: {
			bookmarksVisible,
			bookmarksSettings: {
				defaultMostVisited,
				iconsOnly,
				includeBookmarksManager,
				includeMostVisited,
				includeOtherBookmarks,
				openInNewTab,
				appsLocation,
				chromeTabLocation,
			},
		},
	} = useUserCustomization();
	const { selectBookmarksSetting, toggleBookmarksSetting, toggleShowApp } =
		useUserActions();

	return (
		<ContextMemo
			{...{
				bookmarksVisible,
				defaultMostVisited,
				iconsOnly,
				includeBookmarksManager,
				includeMostVisited,
				includeOtherBookmarks,
				openInNewTab,
				appsLocation,
				chromeTabLocation,
				selectBookmarksSetting,
				toggleBookmarksSetting,
				toggleShowApp,
			}}
		/>
	);
};

export default Bookmarks;
