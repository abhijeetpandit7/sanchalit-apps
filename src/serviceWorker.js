import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { IMAGES, STATIC_RESOURCES, WEB, ONE_YEAR } from "./utils";

clientsClaim();
self.skipWaiting();

process.env.BUILD_TARGET === WEB
	? precacheAndRoute(self.__WB_MANIFEST)
	: precacheAndRoute([]);

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

if (process.env.BUILD_TARGET === WEB)
	registerRoute(
		({ request }) =>
			request.destination === "script" || request.destination === "style",
		new StaleWhileRevalidate({
			cacheName: STATIC_RESOURCES,
		}),
	);

