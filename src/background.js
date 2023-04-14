import { URL_ROOT_DOMAIN } from "./utils";

const openNewTab = () =>
	chrome.tabs.create({
		url: "index.html",
	});

const postUninstallURL = `${URL_ROOT_DOMAIN}`;

chrome.runtime.onInstalled.addListener((event) => {
	event && event.reason && event.reason === "install" && openNewTab();
});

if (+process.env.MANIFEST_VERSION === 2)
	chrome.browserAction.onClicked.addListener(openNewTab);
else chrome.action.onClicked.addListener(openNewTab);

// Extension uninstall event
try {
	chrome.runtime.setUninstallURL(postUninstallURL);
} catch (e) {
	console.error(e);
}
