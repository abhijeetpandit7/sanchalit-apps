import React from "react";
import "./App.css";
import { LogoOverlay } from "./components";
import { Backgrounds, ModalBase } from "./containers";
import { useAuthPersist, useUserCustomization } from "./hooks";
import { TopRow, CenterRegion, CenterBelowRegion, BottomRow } from "./regions";
import { HIDE_APPS, HIDE_BACKGROUND_OVERLAY, HIDE_VISIBILITY } from "./utils";

const App = () => {
	const { mainViewRef, appsRef } = useUserCustomization();

	useAuthPersist();

	return (
		<>
			<LogoOverlay />
			<div
				id="main-view"
				className={`${HIDE_VISIBILITY} ${HIDE_BACKGROUND_OVERLAY}`}
				ref={mainViewRef}
			>
				<Backgrounds />
				<div className={`apps ${HIDE_APPS}`} ref={appsRef}>
					<ModalBase />
					<div className="region top-bar"></div>
					<TopRow />
					<div className="region center-above"></div>
					<CenterRegion />
					<CenterBelowRegion />
					<BottomRow />
				</div>
			</div>
		</>
	);
};

export default App;
