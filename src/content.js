import { CHROME_EXTENSION, MOZ_EXTENSION } from "./utils";

if (chrome && chrome.runtime) {
	const extensionUrl = chrome.runtime.getURL("");
	const urlHead = extensionUrl.startsWith(`${CHROME_EXTENSION}:`)
		? CHROME_EXTENSION
		: extensionUrl.startsWith(`${MOZ_EXTENSION}:`)
		? MOZ_EXTENSION
		: null;
	if (urlHead) {
		const platformInput = document.createElement("input");
		platformInput.type = "hidden";
		platformInput.id = "sanchalitPlatform";
		platformInput.value = urlHead;
		document.body.appendChild(platformInput);
	}
	const manifest = chrome.runtime.getManifest();
	if (manifest) {
		const versionInput = document.createElement("input");
		versionInput.type = "hidden";
		versionInput.id = "sanchalitVersion";
		versionInput.value = manifest.version;
		document.body.appendChild(versionInput);
	}

	window.addEventListener(
		"message",
		(event) => {
			if (window === event.source && event.data.type) {
				switch (event.data.type) {
					case "connectGoogle":
					case "signUpUserWithGoogle":
					case "logInUserWithGoogle":
					case "mergeUserWithGoogle":
					case "logOutUser": {
						chrome.runtime.sendMessage({ ...event.data });
						break;
					}
					default: {
						break;
					}
				}
			}
		},
		false,
	);
}
