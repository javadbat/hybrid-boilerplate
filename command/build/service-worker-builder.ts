import { InjectManifest } from "npm:workbox-webpack-plugin";
import { serverConfig } from "@config/server-config.ts";
import * as path from 'jsr:@std/path';
import { reactAppList } from "@config/build-config.ts";
export class ServiceWorkerBuilder {
    constructor() {

    }
    static getWebpackPluginConfig() {
        const swSrc = path.join(serverConfig.basePath, 'app', 'react-apps', reactAppList[0].folderName, 'pwa', 'service-worker.js');
        const swDest = path.join(serverConfig.basePath, 'app', 'dist', 'react-apps',reactAppList[0].folderName, 'pwa', 'service-worker.js');
        const configuredPlugin = new InjectManifest({
            swSrc,
            swDest,
        });
        return configuredPlugin;
    }
}