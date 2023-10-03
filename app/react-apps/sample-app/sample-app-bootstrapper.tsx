
import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './layout/Layout';
import { ErrorHandler } from '../../utils/error/error-handler';



// window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent the mini-infobar from appearing on mobile
//     e.preventDefault();
//     // Update UI notify the user they can install the PWA
//     e.prompt();
// });
const mountNode = document.getElementById('SampleAppWrapper');
//Bootstrap Application
export class SampleApp {
    constructor() {

    }
    render() {
        if(mountNode){
            const root = ReactDOM.createRoot(mountNode);
           root.render(<Layout />)
        }else{
            console.error("We Cant Mount React because React Mount Node is not available");
        }
    }
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(reg => {
                        console.log('Service worker registered! 😎', reg);
                        reg.update();
                    })
                    .catch(err => {
                        console.log('😥 Service worker registration failed: ', err);
                    });
            });
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.addEventListener('statechange', function () {
                    this.state;
                });
            }

        }
    }
    registerGlobalAppErrorHandler() {
        //register error handlers
        const errorHandler = new ErrorHandler();
        window.addEventListener('error', function (event) {
            errorHandler.onError(event.error);
        });
        window.addEventListener('unhandledrejection', function (event) {
            errorHandler.onError(event.reason);
        });
    }
    loadWasmPackage() {
        // import('../../../wasm/hello-world/pkg/hello_wasm').then((module)=>{
        //     const init = module.default
        //     init().then(() => {
        //     module.greet("hello wasm🐍");
        // })
        // })
        
    }
}
const sampleApp = new SampleApp();
sampleApp.registerGlobalAppErrorHandler();
sampleApp.render();
if (import.meta.webpackHot) {
    import.meta.webpackHot.accept('./layout/Layout', () => {
        sampleApp.render();
    });
}
//uncomment it if you have PWA and want service worker
sampleApp.registerServiceWorker();
sampleApp.loadWasmPackage();