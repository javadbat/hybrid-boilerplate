import { precacheAndRoute } from 'workbox-precaching';

// Use with precache injection
// will precache all files in globDirectory that match globPatterns
const reactAppsAssetsPreUrl = "/dist/ReactApps/";
const machineGeneratedPreCacheList = [{"revision":"51b2a2ef85a9f911301f3aa27a3f85d8","url":"App_ReactApps_SampleApp_Pages_AssetsLoadSample_AssetsLoadSample_js@590a48d0d4c398316b22.chunk.js"},{"revision":"3721f4dafde558755645ff2a83929e16","url":"App_ReactApps_SampleApp_Pages_FolderStructure_FolderStructure_js@174cfd4701fd8db6d548.chunk.js"},{"revision":"e4fa359c472326e5f3b7e32c7ee22b55","url":"App_ReactApps_SampleApp_Pages_Index_Index_js@c74f34f989acf0b7aaa5.chunk.js"},{"revision":"758e1919b0e15ef7c1f6b3ddba079549","url":"assets/images/05c80f266535944fa798.png"},{"revision":"70d42eee6e615c4b9740d9ee9620fd01","url":"assets/images/070d6c4b6f2ee9a36bc7.jpg"},{"revision":"0cbc9cdc96ecbf857845ad36fb183727","url":"assets/images/6cb76579770f26e392de.png"},{"revision":"4826470a6d2c230c00931bb546ea0715","url":"SampleApp/SampleApp.js"}];
let preCacheList = machineGeneratedPreCacheList.map((item)=>{
    return {
        revision:item.revision,
        url:reactAppsAssetsPreUrl + item.url
    };
});
precacheAndRoute(preCacheList);
