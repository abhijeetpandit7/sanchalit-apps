import React, { memo, useEffect, useRef, useState } from "react";
import { HeaderControls, Navbar, ViewContainer } from "../Todo";

const ContextMemo = memo((props) => {
	return (
		<div className="app todo-app calculates-own-max-height">
			<div className="drop-zone drop-left-zone">
				<span className="bar left-bar">
					<span className="bar-name"></span>
				</span>
			</div>
			<div className="drop-zone drop-right-zone">
				<span className="bar right-bar">
					<span className="bar-name"></span>
				</span>
			</div>
			<Navbar>
				<HeaderControls />
			</Navbar>
			<ViewContainer />
		</div>
	);
});

const App = () => {
	return (
		<ContextMemo
		/>
	);
};

export default App;
