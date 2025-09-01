import React, { memo, useEffect, useRef } from "react";
import { useUserCustomization, useUserActions } from "../../hooks";
import {
	BACKGROUND,
	DARK,
	LIGHT,
	SYSTEM,
	setBodyFont,
	setBodyTheme,
	toCSSUrl,
} from "../../utils/";

const ContextMemo = memo(
	({ src, themeColour, themeFont, setWidgetReady, showBackgroundOverlay }) => {
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
			themeFont && setBodyFont(themeFont);
		}, [themeFont]);

		useEffect(() => {
			if (!src) return;
			const backgroundImage = new Image();
			backgroundImage.src = src;
			backgroundImage.onload = () => {
				backgroundItemRef.current.style.backgroundImage = toCSSUrl(
					backgroundImage.src,
				);
				callback();
				showBackgroundOverlay();
			};
			backgroundImage.onerror = () => callback();
		}, [src]);

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
		storageUserCustomization: { backgrounds, themeColour, themeFont },
	} = useUserCustomization();
	const { setWidgetReady } = useUserActions();
	const [{ filename: src }] = backgrounds ?? [{}];

	return (
		<ContextMemo
			{...{
				src,
				themeColour,
				themeFont,
				showBackgroundOverlay,
				setWidgetReady,
			}}
		/>
	);
};
