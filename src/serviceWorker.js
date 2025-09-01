import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import {
	IMAGES,
	ONE_DAY,
	PRE_CACHE_BACKGROUNDS,
	STATIC_RESOURCES,
} from "./utils";

clientsClaim();
self.skipWaiting();

console.info(self.__WB_MANIFEST);

registerRoute(
	({ request }) => request.destination === "image",
	new CacheFirst({
		cacheName: IMAGES,
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
			new ExpirationPlugin({
				maxAgeSeconds: ONE_DAY * 7,
				purgeOnQuotaError: true,
			}),
		],
	}),
);

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === PRE_CACHE_BACKGROUNDS) {
		const { urls } = event.data.payload;
		preCacheBackgrounds(urls);
	}
});

async function preCacheBackgrounds(urls) {
	const cache = await caches.open(IMAGES);

	for (const url of urls) {
		try {
			const cachedResponse = await cache.match(url);
			if (cachedResponse) continue;

			const networkResponse = await fetch(url, { mode: "no-cors" });
			await cache.put(url, networkResponse);
		} catch (error) {}
	}
}

registerRoute(
	({ request }) =>
		request.destination === "script" || request.destination === "style",
	new StaleWhileRevalidate({
		cacheName: STATIC_RESOURCES,
	}),
);
