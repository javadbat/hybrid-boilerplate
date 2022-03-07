import { precacheAndRoute } from 'workbox-precaching';
import { setCacheNameDetails } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

//node app version
// ATTENTION: use appVersion in cache name you want to delete cache when app version change
const appVersion = `app-ver${process.env.npm_package_version}` ;
const isDevelopment = process.env.NODE_ENV === 'development';
//config
setCacheNameDetails({
    prefix: 'sample-app',
    precache: 'precache',
    runtime: 'runtime',
    suffix: appVersion
});
// Use with precache injection
// will precache all files in globDirectory that match globPatterns
if(!isDevelopment){
    const machineGeneratedPreCacheList = self.__WB_MANIFEST;
    const htmlFilePath = '/sample-app';
    const htmlFileCacheEntity = { url: htmlFilePath, revision: '100001' };
    const manifestCacheEntity = { url: '/sample-app/manifest.json', revision: '100002' };
    const precachedStyles = [
        { url: '/App/Assets/Css/Common/Layout.css', revision: '100003' },
        { url: '/App/Assets/Css/Common/General.css', revision: '100004' }
    ];
    let preCacheList = [htmlFileCacheEntity, manifestCacheEntity, ...precachedStyles, ...machineGeneratedPreCacheList];
    precacheAndRoute(preCacheList, {
        // Ignore all URL parameters. /about.html?q=1 => /about.html
        ignoreURLParametersMatching: [/.*/],
        directoryIndex: null,
    });
}


// cache routes
if(!isDevelopment){
    registerRoute(
        ({ request }) => {
            //check url for more specific cache rules
            //const reqUrl = request.url;
            const isImage = request.destination === 'image';
            return isImage;
        },
        new CacheFirst({
            cacheName: 'app-image-cache',
        })
    );
}

//caceh fonts
if(!isDevelopment){
    registerRoute(
        ({ request }) => {
            //check url for more specific cache rules
            //const reqUrl = request.url;
            const isImage = request.destination === 'font';
            return isImage;
        },
        new CacheFirst({
            cacheName: 'app-font-cache',
        })
    );
}
// Clean up caches in activate event to ensure no pages
// are using the old caches.
self.addEventListener('activate', (event) => {
    console.log(`appVersion in service worker activation: ${appVersion}`);
    const promiseChain = caches.keys()
        .then((cacheNames) => {
            const oldVersionCaches = cacheNames.filter((cacheName) => {
                // cache has app-ver tag but not in current version
                return cacheName.indexOf('app-ver') !== -1 && cacheName.indexOf(appVersion) === -1;
            });
            return Promise.all(
                oldVersionCaches.map((cacheName) => caches.delete(cacheName))
            );
        });

    // Keep the service worker alive until all caches are deleted.
    event.waitUntil(promiseChain);
});