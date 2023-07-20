const staticCacheName = 's-app-v1'

const assertUrls = [
	'index.html',
	'/js/app.js',
	'style.css'
]

self.addEventListener(type:'install', listener:async event => {
	const cache = await caches.open(staticCacheName)
	await cache.addAll(assertUrls)
})

self.addEventListener(type:'activate', listener:event => {...})

self.addEventListener(type:'fetch', listener:event => {
	console.log('Fetch', event.request.url)
	
event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	return cached ?? await fetch(request)
}