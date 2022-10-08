const CACHE_NAME = 'v1.0.0';

const FILES_TO_CACHE = [
	'./images/apple-touch-icon-192x192.webp',
	'./images/favicon-32x32.png',
	'./images/favicon-48x48.png',
	'./images/favicon-96x96.png',
	'./images/favicon-144x144.png',
	'./images/favicon-512x512.png',
	'./images/favicon.ico',
	'./images/favicon.svg',
	'./scripts/index.js',
	'./styles/index.css',
	'./index.html',
	'./'
];


self.addEventListener('install', e => {

	// self.skipWaiting();

	e.waitUntil(async () => {

		const cache = await caches.open(CACHE_NAME);
		await cache.addAll(FILES_TO_CACHE);

	});

});

self.addEventListener('activate', e => {

	// self.clients.claim();

	e.waitUntil(async () => {

		// Navigation Preload
		if (self.registration.navigationPreload) {

			await self.registration.navigationPreload.enable();

		}

		// Deleting old caches
		const oldCaches = (await caches.keys()).filter(key => CACHE_NAME != key);

		await Promise.all(oldCaches.map(key => caches.delete(key)));

	});

});

self.addEventListener('fetch', e => {

	if (
		!e.request.url.startsWith('http')
		|| e.request.method == 'POST'
		|| new URL(e.request.url).origin != location.origin
	) {

		return;

	}
  
	e.respondWith(new Promise(async (resolve, reject) => {

		try {

			const cache = await caches.open(CACHE_NAME).catch(err => {

				throw err;

			});

			let res = await cache.match(e.request).catch(err => {

				throw err;

			});

			if (res) {

				return resolve(res);

			}

			res = await fetch(e.request).catch(err => {

				throw err;

			});

			if (res.ok) {

				// be careful not to cache dynamic information
				await cache.put(e.request, res.clone()).catch(err => {

					throw err;

				});

				resolve(res);

			} else {

				reject(new Response(await res.text().catch(err => {

					throw err;

				}), {
					status: res.status,
					statusText: res.statusText
				}));

			}

		} catch(err) {

			console.error(err);

			reject(new Response(err.message, {
				status: 500,
				statusText: 'Internal Server Error'
			}));

		}

	}));

});