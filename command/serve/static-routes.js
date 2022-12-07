import express from 'express';
import path from 'path';

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
            extensions: ['htm', 'html','js','css','jpg','png','svg','gif'],
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
        // TODO
        this.app.use('/App/Assets/Css',express.static(path.join(this.appConfig.basePath,'app','assets','Css'),assetsOptions));
        this.app.use('/app/assets/fonts',express.static(path.join(this.appConfig.basePath,'app','assets','fonts'),assetsOptions));
        this.app.use('/app/assets/images',express.static(path.join(this.appConfig.basePath,'app','assets','images'),assetsOptions));
        //we redirect js load to compiled version
        this.app.use('/app/assets/Js',express.static(path.join(this.appConfig.basePath,'app','dist','assets','javascripts'),assetsOptions));
        this.app.use('/dist',express.static(path.join(this.appConfig.basePath,'app','dist'),assetsOptions));
        this.app.use('/web-components',express.static(path.join(this.appConfig.basePath,'app','web-components'),assetsOptions));
        this.app.use(express.static('Config'));
        // pwa config file
        this.app.use('/sample-app/manifest.json',express.static(path.join(this.appConfig.basePath,'app','react-apps', 'sample-app', 'pwa', 'Manifest.json')));
        this.app.use('/service-worker.js',express.static(path.join(this.appConfig.basePath,'app', 'dist', 'react-apps', 'sample-app', 'pwa', 'service-worker.js'),serviceWorkerAssetOption));
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