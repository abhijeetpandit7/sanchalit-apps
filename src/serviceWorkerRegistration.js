import { Workbox } from "workbox-window";
import { PRODUCTION } from "./utils";

export default function registerServiceWorker() {
	if (process.env.NODE_ENV !== PRODUCTION) return;

	if ("serviceWorker" in navigator) {
		const wb = new Workbox("serviceWorker.js");

		wb.addEventListener("installed", (event) => {
			if (event.isUpdate) window.location.reload();
		});

		wb.register();
	}
}
