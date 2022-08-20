import React, { useRef } from "react";
import { useUserCustomization } from "../../hooks";
import { toCSSUrl } from "../../utils/";

const IMAGE_LINK =
	"https://momentum.photos/img/f49d69a2-dbed-42d0-8443-9c0871ecd491.jpg";

export const Backgrounds = () => {
	const backgroundItemRef = useRef(null);
	const { showApps, showBackgroundOverlay, showMainView } =
		useUserCustomization();

	const callback = () => {
		showMainView();
		showApps();
	};

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

	return (
		<div className="backgrounds">
			<div className="background">
				<div className="background-item" ref={backgroundItemRef}></div>
			</div>
			<div className="background-overlay"></div>
		</div>
	);
};
