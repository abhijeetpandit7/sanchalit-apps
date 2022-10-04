import React, { useEffect, useRef } from "react";
import { useUserActions, useUserCustomization } from "../../hooks";
import {
	ADD_SHADOW,
	HOTKEY_HOVER,
	PHOTO_INFO,
	SHOW_ANYWAY,
	heartIcon,
	skipIcon,
	addRefClassName,
	removeRefClassName,
} from "../../utils";

const ContextMemo = ({ hideApps, setWidgetReady, showApps }) => {
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

	return (
		<div
			className="app-container photo-info"
			onMouseEnter={hideAppsHandler}
			onMouseLeave={showAppsHandler}
			ref={photoInfoRef}
		>
			<div className="app-dash" ref={appDashRef}>
				<div className="title" data-v-1040273e>
					Phuket, Thailand
				</div>
				<div className="source" data-v-1040273e>
					<span className="source-link">Cody Wilson</span>
					<span ref={controlRef}>
						<span title="Favorite" className="favorite control" data-v-1040273e>
							{heartIcon}
						</span>
						<span title="Skip" className="skip control" data-v-1040273e>
							{skipIcon}
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export const PhotoInfo = () => {
	const { hideApps, showApps } = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return <ContextMemo {...{ hideApps, setWidgetReady, showApps }} />;
};
