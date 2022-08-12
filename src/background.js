const postUninstallURL = "https://sanchalit-app.herokuapp.com/";

// Extension uninstall event
try {
	chrome.runtime.setUninstallURL(postUninstallURL);
} catch (e) {
	console.error(e);
}
