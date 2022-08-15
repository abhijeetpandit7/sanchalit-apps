import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import { AuthProvider, UserCustomizationProvider } from "./contexts";
import { register as registerServiceWorker } from "./serviceWorker";

const rootElement = document.getElementById("root");

render(
	<StrictMode>
		<UserCustomizationProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</UserCustomizationProvider>
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
