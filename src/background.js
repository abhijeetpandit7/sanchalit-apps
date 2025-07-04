import {
	AUTH,
	CUSTOMIZATION,
	NETWORK_QUEUE,
	DEFAULT_AUTHENTICATION,
	DEFAULT_CUSTOMIZATION,
	DEFAULT_NETWORK_QUEUE,
	URL_ROOT_API,
	URL_ROOT_DOMAIN,
	addOrMergeObjectProperties,
	getExtensionStorageItem,
	setExtensionStorageItem,
} from "./utils";

const postUninstallURL = `${URL_ROOT_DOMAIN}`;

const openNewTab = () =>
	chrome.tabs.create({
		url: "index.html",
	});

chrome.runtime.onInstalled.addListener((event) => {
	event && event.reason && event.reason === "install" && openNewTab();
});

if (+process.env.MANIFEST_VERSION === 2)
	chrome.browserAction.onClicked.addListener(openNewTab);
else chrome.action.onClicked.addListener(openNewTab);

try {
	chrome.runtime.setUninstallURL(postUninstallURL);
} catch (error) {
	console.error(error);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	switch (message.type) {
		case "connectGoogle":
		case "signUpUserWithGoogle": {
			const {
				payload: { auth },
			} = message;
			if (!auth) return;

			return (
				new Promise(async (resolve, reject) => {
					const storageAuth = await getExtensionStorageItem(AUTH);
					await setExtensionStorageItem(AUTH, {
						...storageAuth,
						...auth,
					});
					resolve();
				})
					.then(() => {
						const closeSenderTab = sender.url.includes("oneTimeLogin");
						if (closeSenderTab) {
							chrome.tabs.remove(sender.tab.id);
						}
						sendResponse({ success: true });
					})
					.catch((error) => sendResponse({ success: false, error })),
				true
			);
		}
		case "logInUserWithGoogle":
		case "mergeUserWithGoogle": {
			const {
				payload: { auth },
			} = message;
			if (!auth) return;

			return (
				new Promise((resolve, reject) => {
					fetch(`${URL_ROOT_API}/userData/settings?profileDetails=1`, {
						credentials: "include",
					})
						.then((response) => response.json())
						.then(async (response) => {
							if (response?.success) {
								await chrome.storage.local.set({
									[AUTH]: {
										...DEFAULT_AUTHENTICATION,
										...response.auth,
									},
									[CUSTOMIZATION]: response.customization
										? addOrMergeObjectProperties(
												DEFAULT_CUSTOMIZATION,
												response.customization,
											)
										: DEFAULT_CUSTOMIZATION,
									[NETWORK_QUEUE]: DEFAULT_NETWORK_QUEUE,
								});
								resolve();
							}
							reject();
						})
						.catch((error) => {
							reject(error);
						});
				})
					.then(() => {
						const closeSenderTab = sender.url.includes("oneTimeLogin");
						if (closeSenderTab) {
							chrome.tabs.remove(sender.tab.id);
						}
						sendResponse({ success: true });
					})
					.catch((error) => sendResponse({ success: false, error })),
				true
			);
		}
		case "logOutUser": {
			chrome.storage.local.set({
				[AUTH]: DEFAULT_AUTHENTICATION,
				[CUSTOMIZATION]: DEFAULT_CUSTOMIZATION,
				[NETWORK_QUEUE]: DEFAULT_NETWORK_QUEUE,
			});
			break;
		}
		default:
			break;
	}
});
