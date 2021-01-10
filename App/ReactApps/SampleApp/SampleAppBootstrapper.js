import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout/Layout';
import { ErrorHandler } from '../../Utils/Error/ErrorHandler';
//register error handlers
const errorHandler = new ErrorHandler();
window.addEventListener('error', function (event) {
    errorHandler.onError(event.error);
});
window.addEventListener('unhandledrejection', function (event) {
    errorHandler.onError(event.reason);
});
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('service-worker.js')
                .then(reg => {
                    console.log('Service worker registered! 😎', reg);
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
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Update UI notify the user they can install the PWA
    e.prompt();
});
const mountNode = document.getElementById('SampleAppWrapper');
//Bootstrap Application
const render = () => {
    ReactDOM.render(
        <Layout />,
        mountNode
    );
};
render();
if (module.hot) {
    module.hot.accept('./Layout/Layout', () => {
        render();
    });
}
//registerServiceWorker();
