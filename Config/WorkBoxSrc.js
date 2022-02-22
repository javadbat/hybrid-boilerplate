import { precacheAndRoute } from 'workbox-precaching';

// Use with precache injection
// will precache all files in globDirectory that match globPatterns
const reactAppsAssetsPreUrl = "/dist/ReactApps/";
const machineGeneratedPreCacheList = self.__WB_MANIFEST;
let preCacheList = machineGeneratedPreCacheList.map((item)=>{
    return {
        revision:item.revision,
        url:reactAppsAssetsPreUrl + item.url
    };
});
precacheAndRoute(preCacheList);
