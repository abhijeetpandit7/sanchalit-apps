import React, { memo } from "react";
import "./App.css";
import { LogoOverlay } from "./components";
import { Backgrounds, ModalBase } from "./containers";
import { useAuthPersist, useUserCustomization } from "./hooks";
import {
	TopBar,
	TopRow,
	CenterRegion,
	CenterBelowRegion,
	BottomRow,
} from "./regions";
import { HIDE_APPS, HIDE_BACKGROUND_OVERLAY, HIDE_VISIBILITY } from "./utils";

const ContextMemo = memo(({ appsRef, mainViewRef }) => (
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
				<TopBar />
				<TopRow />
				<div className="region center-above"></div>
				<CenterRegion />
				<CenterBelowRegion />
				<BottomRow />
			</div>
		</div>
	</>
));

const App = () => {
	const { appsRef, mainViewRef } = useUserCustomization();

	useAuthPersist();

	return <ContextMemo {...{ appsRef, mainViewRef }} />;
};

export default App;
