import React, { useEffect, useRef } from "react";
import { useAuth, useUserActions, useUserCustomization } from "../../hooks";
import {
	ACTIVE,
	ADD_SHADOW,
	HOTKEY_HOVER,
	PHOTO_INFO,
	SHOW_ANYWAY,
	heartIcon,
	skipIcon,
	addRefClassName,
	removeRefClassName,
	toggleRefClassName,
} from "../../utils";

const ContextMemo = ({
	hideApps,
	setWidgetReady,
	showApps,
	skipBackground,
	toggleBackgroundFavourite,
	hasPlus,
	...activeBackground
}) => {
	const heartIconRef = useRef(null);
	const photoInfoRef = useRef(null);
	const appDashRef = useRef(null);
	const controlRef = useRef(null);

	useEffect(() => setWidgetReady({ widget: PHOTO_INFO }), []);

	const hideAppsHandler = () => {
		const hideAppsTimeout = setTimeout(() => {
			hideApps();
			addRefClassName(photoInfoRef, SHOW_ANYWAY);
			addRefClassName(appDashRef, SHOW_ANYWAY);
			addRefClassName(appDashRef, ADD_SHADOW);
			addRefClassName(appDashRef, HOTKEY_HOVER);
		}, 3000);

		photoInfoRef.current.addEventListener("mouseleave", () =>
			clearTimeout(hideAppsTimeout),
		);
		controlRef.current.addEventListener("mouseenter", () => {
			clearTimeout(hideAppsTimeout);
			showAppsHandler();
		});
	};

	const showAppsHandler = () => {
		showApps();
		removeRefClassName(photoInfoRef, SHOW_ANYWAY);
		removeRefClassName(appDashRef, SHOW_ANYWAY);
		removeRefClassName(appDashRef, ADD_SHADOW);
		removeRefClassName(appDashRef, HOTKEY_HOVER);
	};

	const toggleFavouriteBackground = () => {
		const isFavourite = toggleRefClassName(heartIconRef, ACTIVE);
		activeBackground.id &&
			toggleBackgroundFavourite(activeBackground.id, isFavourite);
	};

	return (
		<div
			className="app-container photo-info"
			onMouseEnter={hideAppsHandler}
			onMouseLeave={showAppsHandler}
			ref={photoInfoRef}
		>
			<div className="app-dash" ref={appDashRef}>
				<div className="title" data-v-1040273e>
					{activeBackground.title}
				</div>
				<div className="source" data-v-1040273e>
					<a
						className="source-link"
						href={activeBackground.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{activeBackground.source}
					</a>
					<span ref={controlRef}>
						<span
							title={`${activeBackground.isFavourite ? "Unfavourite" : "Favourite"}`}
							className={`control favorite ${
								activeBackground.isFavourite ? ACTIVE : ""
							}`}
							onClick={toggleFavouriteBackground}
							ref={heartIconRef}
							data-v-1040273e
						>
							{heartIcon}
						</span>
						<span
							title="Skip"
							className="skip control"
							onClick={() => skipBackground(hasPlus)}
							data-v-1040273e
						>
							{skipIcon}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export const PhotoInfo = () => {
	const {
		storageAuth: { subscriptionSummary },
	} = useAuth();
	const {
		hideApps,
		showApps,
		storageUserCustomization: { backgrounds },
	} = useUserCustomization();
	const { setWidgetReady, skipBackground, toggleBackgroundFavourite } =
		useUserActions();

	const [activeBackground] = backgrounds ?? [{}];
	const hasPlus = !!subscriptionSummary?.plan;

	return (
		<ContextMemo
			{...{
				hideApps,
				setWidgetReady,
				showApps,
				skipBackground,
				toggleBackgroundFavourite,
				hasPlus,
				...activeBackground,
			}}
		/>
	);
};
