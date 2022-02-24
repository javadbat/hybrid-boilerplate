import { precacheAndRoute,  } from 'workbox-precaching';

// Use with precache injection
// will precache all files in globDirectory that match globPatterns
const machineGeneratedPreCacheList = self.__WB_MANIFEST;
const htmlFilePath = '/sample-app';
let preCacheList = [{url: htmlFilePath, revision: '383676' },...machineGeneratedPreCacheList];
precacheAndRoute(preCacheList,{
    // Ignore all URL parameters. /about.html?q=1 => /about.html
    ignoreURLParametersMatching: [/.*/],
    directoryIndex: null,
});
