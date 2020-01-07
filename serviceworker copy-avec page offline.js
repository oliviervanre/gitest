

const staticCacheName = version + 'staticfiles'
addEventListener('install', (installEvent)=>{
    console.log('Le service worker est en installation...')
    installEvent.waitUntil(
        caches.open(staticCacheName)
        .then( staticCache =>{
            // fichiers souhaités en cache
            staticCache.addAll([
                'assets/font.txt', 
                'assets/icon.txt'
            ])
            // fichiers à mettre impérativement en cache
            return staticCache.addAll([
                'index.html',
                'css/stylesheet.css',
                'js/javascript.js'
            ])
        })
    )
})
addEventListener('activate', (event)=>{
    console.log('Le service worker est activé')
})
addEventListener('fetch', fetchEvent =>{
    const request = fetchEvent.request
    fetchEvent.respondWith(
        fetch(request)
        .then(responseFromFetch => {
            return responseFromFetch
/*          console.log(responseFromFetch)
         return new Response(
            '<h1>Youhou </h1><p>c est la fête du fetch !</p>',
            {
                headers :{'Content-type': 'text/html; charset=utf-8'}
            }
        ) */
        })
        .catch(error => {
            return new Response(
                '<h1>Ah... </h1><p>un problème est survenu, on dirait qu\'il n\'y a plus de réseau !</p><p>heureusement il y a les PWA !</p>',
                {
                    headers :{'Content-type': 'text/html; charset=utf-8'}
                }
            )
        })
    )
})
