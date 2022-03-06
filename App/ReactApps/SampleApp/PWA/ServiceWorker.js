import { precacheAndRoute } from 'workbox-precaching';
import { setCacheNameDetails } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
//config
setCacheNameDetails({
    prefix: 'sample-app',
    precache: 'sample-app-precache',
    suffix: 'v1'
});
// Use with precache injection
// will precache all files in globDirectory that match globPatterns
const machineGeneratedPreCacheList = self.__WB_MANIFEST;
const htmlFilePath = '/sample-app';
const htmlFileCacheEntity = { url: htmlFilePath, revision: '100001' };
const manifestCacheEntity = {url:'/sample-app/manifest.json', revision: '100002'};
const precachedStyles = [
    {url:'/App/Assets/Css/Common/Layout.css', revision: '100003'},
    {url:'/App/Assets/Css/Common/General.css', revision: '100004'}
];
let preCacheList = [htmlFileCacheEntity, manifestCacheEntity, ...precachedStyles, ...machineGeneratedPreCacheList];
precacheAndRoute(preCacheList, {
    // Ignore all URL parameters. /about.html?q=1 => /about.html
    ignoreURLParametersMatching: [/.*/],
    directoryIndex: null,
});

// cache routes
registerRoute(
    ({ request }) => {
        console.log(request);
        //check url for more specific cache rules
        //const reqUrl = request.url;
        const isImage = request.destination === 'image';
        return isImage;
    },
    new CacheFirst({
        cacheName: 'app-image-cache',
    })
);

registerRoute(
    ({ request }) => {
        console.log(request);
        //check url for more specific cache rules
        //const reqUrl = request.url;
        const isImage = request.destination === 'font';
        return isImage;
    },
    new CacheFirst({
        cacheName: 'app-font-cache',
    })
);