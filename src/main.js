import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import {
	AuthProvider,
	NetworkQueueProvider,
	UserCustomizationProvider,
} from "./contexts";
import registerServiceWorker from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");

render(
	<StrictMode>
		<UserCustomizationProvider>
			<AuthProvider>
				<NetworkQueueProvider>
					<App />
				</NetworkQueueProvider>
			</AuthProvider>
		</UserCustomizationProvider>
	</StrictMode>,
	rootElement,
);

registerServiceWorker();
