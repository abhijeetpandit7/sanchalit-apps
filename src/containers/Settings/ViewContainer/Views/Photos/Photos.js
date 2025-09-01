import React, { memo, useEffect, useState } from "react";

import {
	CollapsibleHeaderWrapper,
	ToggleOptions,
} from "../../../../../components";
import {
	useAuth,
	useUserActions,
	useUserCustomization,
} from "../../../../../hooks";
import { BACKGROUNDS_FREQUENCY_OPTIONS, toCSSUrl } from "../../../../../utils";

const ContextMemo = memo((props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [favouriteList, setFavouriteList] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await props.getBackgroundsFavourites();
			if (response?.success) {
				setFavouriteList(response.favouriteList);
			}
			setIsLoading(false);
		})();
	}, []);

	const CollapsibleContent = () => (
		<>
			<h4>Feeds</h4>
			<ul className="settings-list options-list">
				<ToggleOptions
					name="Frequency"
					description="How often a new photo is shown"
					hasPlus={props.hasPlus}
					keyValue="frequency"
					options={BACKGROUNDS_FREQUENCY_OPTIONS}
					plusOnly
					toggle={props.selectBackgroundsSetting}
					value={props.frequency}
				/>
			</ul>
		</>
	);

	return (
		<div
			id="settings-backgrounds"
			className="settings-view settings-backgrounds"
		>
			<div className="main-container">
				<CollapsibleHeaderWrapper
					header="Photos"
					description="See a new inspiring photo each day"
				>
					<CollapsibleContent />
				</CollapsibleHeaderWrapper>

				<nav className="settings-subnav">
					<div className="subnav-titles">
						<h4 className="custom active">Favourites</h4>
					</div>
				</nav>

				<div className="list-wrapper has-subnav">
					<div className="list-body">
						{favouriteList.length === 0 ? (
							<div className={`settings-empty ${isLoading ? "loading" : ""}`}>
								<p className="settings-empty-loading">
									<i className="loading-icon"></i>Loading...
								</p>
								<p className="settings-empty-title">No favourite photos yet</p>
								<p className="settings-empty-description">
									Click the heart icon under a photo caption to start your
									collection
								</p>
							</div>
						) : (
							<div className="tile-list backgrounds-list">
								{/* .activating */}
								{favouriteList.map(({ filename, id, title }) => (
									<div
										className={`tile-list-item ${id === props.activeBackgroundId ? "active" : ""}`}
										key={id}
										title={title}
									>
										<span
											className="tile-list-image"
											style={{
												backgroundImage: toCSSUrl(filename),
											}}
										></span>

										{/* <span className="tile-list-actions">
											<span
												className="control control-select"
												title={`${id === props.activeBackgroundId ? "(Already Active)" : "Set Active"}`}
											>
												<i className="icon-check"></i>
											</span>
										</span>
										<span className="tile-list-loading">
											<i className="loading-icon"></i>
										</span> */}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

const Photos = () => {
	const {
		storageAuth: { subscriptionSummary },
	} = useAuth();
	const {
		storageUserCustomization: {
			backgrounds: [{ id: activeBackgroundId }],
			backgroundsSettings: { frequency },
		},
	} = useUserCustomization();
	const { getBackgroundsFavourites, selectBackgroundsSetting } =
		useUserActions();
	const hasPlus = !!subscriptionSummary?.plan;

	return (
		<ContextMemo
			{...{
				activeBackgroundId,
				frequency,
				hasPlus,
				getBackgroundsFavourites,
				selectBackgroundsSetting,
			}}
		/>
	);
};

export default Photos;

