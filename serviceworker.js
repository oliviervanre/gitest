const version = 'V0.2'
const staticCacheName = version + 'staticfiles'
self.addEventListener('install', (installEvent) => {
    console.log('Le service worker est en installation...')
    skipWaiting()
    installEvent.waitUntil(
        caches.open(staticCacheName)
        .then(staticCache => {
            // fichiers souhaités en cache
            staticCache.addAll([
                "assets/font.txt",
                "assets/icon.txt"
            ])
            console.log('mise en cache des fichiers, SW installé dans la version ' + version)
            // fichiers à mettre impérativement en cache
            return staticCache.addAll([
                "css/stylesheet.css",
                "js/javascript.js",
                "offline.html",
                "manifest.json"
            ])
        })
    )
})
   


addEventListener('activate', (activateEvent) => {
    console.log('Le service worker est activé')
    activateEvent.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != staticCacheName) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(() => {
            return clients.claim()
        })
    )
})
addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request
    console.log(request)
    fetchEvent.respondWith(
        caches.match(request)
        .then(responseFromCache => {
            if (responseFromCache) {
                console.log('cache !')
                return responseFromCache
            }
            console.log('pas cache : ' + request.url)
            return fetch(request)
            .catch( error => {
                return caches.match('/offline.html')
            })
        })
    )
})


