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
        this.app.use('/App/Assets/Css',express.static(path.join(this.appConfig.basePath,'App','Assets','Css'),assetsOptions));
        this.app.use('/App/Assets/Fonts',express.static(path.join(this.appConfig.basePath,'App','Assets','Fonts'),assetsOptions));
        this.app.use('/App/Assets/Images',express.static(path.join(this.appConfig.basePath,'App','Assets','Images'),assetsOptions));
        //we redirect js load to compiled version
        this.app.use('/App/Assets/Js',express.static(path.join(this.appConfig.basePath,'App','dist','Assets','Js'),assetsOptions));
        this.app.use('/dist',express.static(path.join(this.appConfig.basePath,'App','dist'),assetsOptions));
        this.app.use('/WebComponents',express.static(path.join(this.appConfig.basePath,'App','WebComponents'),assetsOptions));
        this.app.use(express.static('Config'));
        // pwa config file
        this.app.use('/sample-app/manifest.json',express.static(path.join(this.appConfig.basePath,'App','ReactApps', 'SampleApp', 'pwa', 'Manifest.json')));
        this.app.use('/service-worker.js',express.static(path.join(this.appConfig.basePath,'App', 'dist', 'ReactApps', 'SampleApp', 'pwa', 'service-worker.js'),serviceWorkerAssetOption));
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