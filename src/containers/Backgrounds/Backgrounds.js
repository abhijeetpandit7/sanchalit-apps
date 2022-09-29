import React, { memo, useEffect, useRef } from "react";
import { useUserCustomization, useUserActions } from "../../hooks";
import {
	BACKGROUND,
	DARK,
	LIGHT,
	SYSTEM,
	setBodyTheme,
	toCSSUrl,
} from "../../utils/";

const IMAGE_LINK =
	"https://momentum.photos/img/f49d69a2-dbed-42d0-8443-9c0871ecd491.jpg";

const ContextMemo = memo(
	({ themeColour, setWidgetReady, showBackgroundOverlay }) => {
		const backgroundItemRef = useRef(null);

		const callback = () => setWidgetReady({ widget: BACKGROUND, type: "data" });

		useEffect(() => {
			switch (themeColour) {
				case SYSTEM:
					const prefersLight = window.matchMedia(
						"(prefers-color-scheme: light)",
					);
					if (prefersLight.matches) {
						return setBodyTheme(LIGHT);
					} else {
						return setBodyTheme(DARK);
					}

				case LIGHT:
					return setBodyTheme(LIGHT);

				case DARK:
					return setBodyTheme(DARK);

				default:
					break;
			}
		}, [themeColour]);

		useEffect(() => {
			const backgroundImage = new Image();
			backgroundImage.src = IMAGE_LINK;
			backgroundImage.onload = () => {
				backgroundItemRef.current.style.backgroundImage = toCSSUrl(
					backgroundImage.src,
				);
				callback();
				showBackgroundOverlay();
			};
			backgroundImage.onerror = () => callback();
		}, []);

		return (
			<div className="backgrounds">
				<div className="background">
					<div className="background-item" ref={backgroundItemRef}></div>
				</div>
				<div className="background-overlay"></div>
			</div>
		);
	},
);

export const Backgrounds = () => {
	const {
		showBackgroundOverlay,
		storageUserCustomization: { themeColour },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();

	return (
		<ContextMemo {...{ themeColour, showBackgroundOverlay, setWidgetReady }} />
	);
};
