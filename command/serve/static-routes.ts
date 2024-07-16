import express from 'express';
import path from 'node:path';
import { buildConfig } from '../../config/build-config.ts';
import { serverConfig } from "../../config/server-config.ts";

class StaticRoutes{
    #app:any
    constructor(app:any){
        this.#app = app;
    }
    init(){
        
        const assetsOptions = {
            dotfiles: 'ignore',
            etag: false,
            //if you want to add more static files to be loaded as a static assets you can add them here
            extensions: ['htm', 'html','js','css','jpg','png','svg','gif', 'map'],
            index: false,
            maxAge: '1d',
            redirect: false,
            // eslint-disable-next-line no-unused-vars
            setHeaders: function (res:any, path:string, stat:any) {
                res.set('x-timestamp', Date.now());
            }
        };

        if(serverConfig.env.nodeEnv == "development"){
            //disable cache for dev 
            assetsOptions.maxAge = '0s';
        }
        const serviceWorkerAssetOption = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['js'],
            index: false,
            maxAge: '0s',
            redirect: false,
            setHeaders: function (res:any, path:string, stat:string) {
                res.set('x-timestamp', Date.now());
            }
        }
        if(serverConfig.env.nodeEnv == "production"){
            this.registerBrotliMiddleware();
        } 
        this.#app.use('/node_modules',express.static(path.join(serverConfig.basePath,'node_modules'),assetsOptions));
        this.#app.use('/app/dist/assets/styles/',express.static(path.join(serverConfig.basePath,'app','dist','assets','styles'),assetsOptions));
        this.#app.use('/app/assets/fonts',express.static(path.join(serverConfig.basePath,'app','assets','fonts'),assetsOptions));
        this.#app.use('/app/assets/images',express.static(path.join(serverConfig.basePath,'app','assets','images'),assetsOptions));
        //we redirect js load to compiled version
        this.#app.use('/app/assets/scripts',express.static(path.join(serverConfig.basePath,'app','dist','assets','scripts'),assetsOptions));
        this.#app.use('/dist',express.static(path.join(serverConfig.basePath,'app','dist'),assetsOptions));
        this.#app.use('/web-components',express.static(path.join(serverConfig.basePath,'app','web-components'),assetsOptions));
        this.#app.use(express.static('Config'));
        // pwa config file
        this.#app.use(`/${buildConfig.reactApps.appList[0].folderName}/manifest.json`,express.static(path.join(serverConfig.basePath,'app','react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'manifest.json')));
        this.#app.use('/service-worker.js',express.static(path.join(serverConfig.basePath,'app', 'dist', 'react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'service-worker.js'),serviceWorkerAssetOption));
        this.#app.use('/service-worker.js.br',express.static(path.join(serverConfig.basePath,'app', 'dist', 'react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'service-worker.js.br'),serviceWorkerAssetOption));
        // for web assembly files
        this.#app.use('/wasm',express.static(path.join(serverConfig.basePath,'wasm')));
    }
    registerBrotliMiddleware(){
        // add css file fallback to use broteli compress file
        this.#app.get('*.css', (req:any, res:any, next:any) => {
            if (req.header('Accept-Encoding').includes('br')) {
                req.url = req.url + '.br';
                res.set('Content-Encoding', 'br');
                res.set('Content-Type', 'text/css; charset=UTF-8');
            }
            next();
        });
        // add js file fallback to use broteli compress file
        this.#app.get('*.js', (req:any, res:any, next:any) => {
            if (req.header('Accept-Encoding').includes('br')) {
                req.url = req.url + '.br';
                res.set('Content-Encoding', 'br');
                res.set('Content-Type', 'application/javascript; charset=UTF-8');
            }
            next();
        });
        //TODO: add brotli to webpack builded files
    }
}
export default StaticRoutes;