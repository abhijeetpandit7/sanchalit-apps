import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { IMAGES, STATIC_RESOURCES, ONE_YEAR, isBuildTargetWeb } from "./utils";

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
				maxAgeSeconds: ONE_YEAR,
			}),
		],
	}),
);

if (isBuildTargetWeb)
	registerRoute(
		({ request }) =>
			request.destination === "script" || request.destination === "style",
		new StaleWhileRevalidate({
			cacheName: STATIC_RESOURCES,
		}),
	);

