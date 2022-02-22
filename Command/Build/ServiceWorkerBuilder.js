import { injectManifest } from "workbox-build";
import { generalConfigServer } from "../../Config/GeneralConfigServer.js";
import {rollup,watch} from'rollup' ;
import path from 'path';
export class ServiceWorkerBuilder {
    constructor() {

    }
    init() {
        const swSrc = path.join(generalConfigServer.basePath, 'Config', 'WorkBoxSrc.js');
        const swDest = path.join(generalConfigServer.basePath, 'App', 'ReactApps', 'SampleApp', 'PWA', 'ServiceWorker.js');
        injectManifest({
            swSrc,
            swDest,
            globDirectory:path.join(generalConfigServer.basePath, 'App',"dist","ReactApps"),
            globPatterns: ["**/*.{js,css,html,png,jpg,gif,svg,eot,ttf,woff,woff2}"],
            globIgnores: ["**/*.map"],
            // Other configuration options...
        }).then(({ count, size }) => {
            console.log(
                `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
            );
        });
    }
    buildWithRollup(){
        
    }
}