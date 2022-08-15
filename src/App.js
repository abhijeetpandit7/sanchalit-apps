import React from "react";
import "./App.css";
import { LogoOverlay } from "./components";
import { Backgrounds, ModalBase } from "./containers";
import { useAuthPersist, useUserCustomization } from "./hooks";
import { TopRow, CenterRegion, CenterBelowRegion, BottomRow } from "./regions";

const App = () => {
	useAuthPersist();

	return (
		<>
			<LogoOverlay />
			<div id="main-view">
				<Backgrounds />
				<div className="apps">
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
