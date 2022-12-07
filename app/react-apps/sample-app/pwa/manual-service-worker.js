//this is manually writed service worker 
// if you want to write your own service worker code please rename this file name to ServiceWorker.js and disable automatic workbox service worker generator 
const cacheName = 'sample-app-cache';
const version = '1.0.0';
const precacheResources = [
    '/sample-app',
    '/dist/react-apps/sample-app/sample-app.js',
    '/app/assets/styles/layout.css',
    '/app/assets/styles/general.css',
    '/app/assets/images/logo.svg'
];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetchHandler(event));
});
function fetchHandler(event) {
    //console.log(event.request);
    return new Promise((resolve, reject) => {
        getFromNetwork(event.request, 1000).then((response) => {
            checkPolicyAndAddToCache(cacheName, event.request, response.clone());
            resolve(response);
        }).catch((err) => {
            caches.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        resolve(cachedResponse);
                    }
                    resolve(fetch(event.request));
                });
        });
    });


}
function getFromNetwork(request, timeout) {
    //we try to fetch resource from server if it fails or pass timeout we use the cache version
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout);
        fetch(request).then(response => {
            clearTimeout(timeoutId);
            resolve(response);
        }, reject);
    });
}
function checkPolicyAndAddToCache(cacheName, request, response) {
    return new Promise((resolve, reject) => {
        const isCachableFile = request.destination == "style" || request.destination == "document" || request.destination == "script" || request.destination == "font";
        const isHttpRequest = request.url.indexOf('http') === 0;
        if (request.method == 'GET' && isCachableFile && isHttpRequest) {
            addToCache(cacheName, request, response).then(()=>{
                resolve(true);
            });
        }else{
            resolve(false);
        }
    });


}
function addToCache(cacheName, request, response) {
    return new Promise((resolve, reject) => {
        caches.open(cacheName).then(cache => {
            const cachePromise = cache.put(request, response);
            cachePromise.then(()=>{
                resolve(cachePromise);
            });
        });
    });
    
    
}
function clearCaches() {
    return caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (key) {
            return key.indexOf(version) !== 0;
        }).map(function (key) {
            return caches.delete(key);
        })
        );
    });
}
//read this: https://www.afasterweb.com/2017/01/31/upgrading-your-service-worker-cache/