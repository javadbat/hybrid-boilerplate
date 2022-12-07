//import { injectManifest } from "workbox-build";
import { InjectManifest } from "workbox-webpack-plugin";
import { generalConfigServer } from "../../config/general-config-server.js";
import path from 'path';
export class ServiceWorkerBuilder {
    constructor() {

    }
    static getWebpackPluginConfig() {
        const swSrc = path.join(generalConfigServer.basePath, 'App', 'ReactApps', 'SampleApp', 'pwa', 'service-worker.js');
        const swDest = path.join(generalConfigServer.basePath, 'App', 'dist', 'ReactApps', 'SampleApp', 'paw', 'service-worker.js');
        const configuredPlugin = new InjectManifest({
            swSrc,
            swDest,
        });
        return configuredPlugin;
    }
}