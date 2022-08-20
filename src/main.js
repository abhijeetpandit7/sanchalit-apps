import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import { AuthProvider, UserCustomizationProvider } from "./contexts";
import registerServiceWorker from "./serviceWorkerRegistration";

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

registerServiceWorker();
