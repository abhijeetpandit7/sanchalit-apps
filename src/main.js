import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import { register as registerServiceWorker } from "./serviceWorker";

const rootElement = document.getElementById("root");

render(
	<StrictMode>
			<App />
	</StrictMode>,
	rootElement,
);

// Register service worker on web
if (
	process.env.NODE_ENV === "production" &&
	process.env.BUILD_TARGET === "web"
) {
	registerServiceWorker();
}
