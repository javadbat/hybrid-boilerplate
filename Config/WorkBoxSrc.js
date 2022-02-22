import { precacheAndRoute } from 'workbox-precaching';

// Use with precache injection
// will precache all files in globDirectory that match globPatterns
const machineGeneratedPreCacheList = self.__WB_MANIFEST;
const htmlFilePath = '/sample-app';
let preCacheList = [htmlFilePath,...machineGeneratedPreCacheList];
precacheAndRoute(preCacheList);
