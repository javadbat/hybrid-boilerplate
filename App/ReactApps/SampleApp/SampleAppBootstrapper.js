import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout/Layout';
import { ErrorHandler } from '../../Utils/Error/ErrorHandler';



// window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent the mini-infobar from appearing on mobile
//     e.preventDefault();
//     // Update UI notify the user they can install the PWA
//     e.prompt();
// });
const mountNode = document.getElementById('SampleAppWrapper');
//Bootstrap Application
export class SampleApp{
    constructor(){

    }
    render(){
        ReactDOM.render(
            <Layout />,
            mountNode
        );
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
    registerGlobalAppErrorHandler(){
        //register error handlers
        const errorHandler = new ErrorHandler();
        window.addEventListener('error', function (event) {
            errorHandler.onError(event.error);
        });
        window.addEventListener('unhandledrejection', function (event) {
            errorHandler.onError(event.reason);
        });
    }
}
const sampleApp = new SampleApp();
sampleApp.registerGlobalAppErrorHandler();
sampleApp.render();
if (import.meta.webpackHot) {
    import.meta.webpackHot.accept('./Layout/Layout', () => {
        sampleApp.render();
    });
}
//uncomment it if you have PWA and want service worker
sampleApp.registerServiceWorker();

