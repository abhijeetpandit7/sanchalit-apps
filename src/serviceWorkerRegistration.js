import { Workbox } from "workbox-window";
import { PRODUCTION, isBuildTargetWeb } from "./utils";

export default function registerServiceWorker() {
	if (process.env.NODE_ENV !== PRODUCTION || isBuildTargetWeb === false) return;

	if ("serviceWorker" in navigator) {
		const wb = new Workbox("serviceWorker.js");

		wb.addEventListener("installed", (event) => {
			if (event.isUpdate) window.location.reload();
		});

		wb.register();
	}
}
