import { InjectManifest } from "workbox-webpack-plugin";
import { generalConfigServer } from "../../config/general-config-server.js";
import path from 'path';
import { buildConfig } from "../../config/build-config.js";
export class ServiceWorkerBuilder {
    constructor() {

    }
    static getWebpackPluginConfig() {
        const swSrc = path.join(generalConfigServer.basePath, 'app', 'react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'service-worker.js');
        const swDest = path.join(generalConfigServer.basePath, 'app', 'dist', 'react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'service-worker.js');
        const configuredPlugin = new InjectManifest({
            swSrc,
            swDest,
        });
        return configuredPlugin;
    }
}