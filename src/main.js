import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
	AuthProvider,
	NetworkQueueProvider,
	UserCustomizationProvider,
} from "./contexts";
import registerServiceWorker from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
	<StrictMode>
		<UserCustomizationProvider>
			<AuthProvider>
				<NetworkQueueProvider>
					<App />
				</NetworkQueueProvider>
			</AuthProvider>
		</UserCustomizationProvider>
	</StrictMode>,
);

registerServiceWorker();
