import express from 'express';
import path from 'path';
import { generalConfigServer } from '../../config/general-config-server.js';
import { buildConfig } from '../../config/build-config.js';

class StaticRoutes{
    constructor(app,config){
        this.app = app;
        this.appConfig = config;
        
    }
    init(){
        
        var assetsOptions = {
            dotfiles: 'ignore',
            etag: false,
            //if you want to add more static files to be loaded as a static assets you can add them here
            extensions: ['htm', 'html','js','css','jpg','png','svg','gif', 'map'],
            index: false,
            maxAge: '1d',
            redirect: false,
            // eslint-disable-next-line no-unused-vars
            setHeaders: function (res, path, stat) {
                res.set('x-timestamp', Date.now());
            }
        };

        if(this.appConfig.env == 'dev'){
            //disable cach for dev 
            assetsOptions.maxAge = '0s';
        }
        const serviceWorkerAssetOption = {
            dotfiles: 'ignore',
            etag: false,
            extensions: ['js'],
            index: false,
            maxAge: '0s',
            redirect: false,
            setHeaders: function (res, path, stat) {
                res.set('x-timestamp', Date.now());
            }
        }
        if(generalConfigServer.env == "production"){
            this.registerBrotliMiddleware();
        } 
        this.app.use('/node_modules',express.static(path.join(this.appConfig.basePath,'node_modules'),assetsOptions));
        this.app.use('/app/dist/assets/styles/',express.static(path.join(this.appConfig.basePath,'app','dist','assets','styles'),assetsOptions));
        this.app.use('/app/assets/fonts',express.static(path.join(this.appConfig.basePath,'app','assets','fonts'),assetsOptions));
        this.app.use('/app/assets/images',express.static(path.join(this.appConfig.basePath,'app','assets','images'),assetsOptions));
        //we redirect js load to compiled version
        this.app.use('/app/assets/scripts',express.static(path.join(this.appConfig.basePath,'app','dist','assets','scripts'),assetsOptions));
        this.app.use('/dist',express.static(path.join(this.appConfig.basePath,'app','dist'),assetsOptions));
        this.app.use('/web-components',express.static(path.join(this.appConfig.basePath,'app','web-components'),assetsOptions));
        this.app.use(express.static('Config'));
        // pwa config file
        this.app.use(`/${buildConfig.reactApps.appList[0].folderName}/manifest.json`,express.static(path.join(this.appConfig.basePath,'app','react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'manifest.json')));
        this.app.use('/service-worker.js',express.static(path.join(this.appConfig.basePath,'app', 'dist', 'react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'service-worker.js'),serviceWorkerAssetOption));
        this.app.use('/service-worker.js.br',express.static(path.join(this.appConfig.basePath,'app', 'dist', 'react-apps', buildConfig.reactApps.appList[0].folderName, 'pwa', 'service-worker.js.br'),serviceWorkerAssetOption));
        // for web assembly files
        this.app.use('/wasm',express.static(path.join(this.appConfig.basePath,'wasm')));
    }
    registerBrotliMiddleware(){
        // add css file fallback to use broteli compress file
        this.app.get('*.css', (req, res, next) => {
            if (req.header('Accept-Encoding').includes('br')) {
                req.url = req.url + '.br';
                res.set('Content-Encoding', 'br');
                res.set('Content-Type', 'text/css; charset=UTF-8');
            }
            next();
        });
        // add js file fallback to use broteli compress file
        this.app.get('*.js', (req, res, next) => {
            if (req.header('Accept-Encoding').includes('br')) {
                req.url = req.url + '.br';
                res.set('Content-Encoding', 'br');
                res.set('Content-Type', 'application/javascript; charset=UTF-8');
            }
            next();
        });
        //TODO: add brotly to webpack builded files
    }
}
export default StaticRoutes;