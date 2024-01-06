# Command folder

in this folder you can create your custom command scripts to be run at server.
currently we have these commands:

- build:
    in build we have 4 build process:
    - build-module to build web-components and non-react pages scripts via rollup.
    - react-builder to create react apps.
    - sass-builder for building pages sass files defined in build-config.js.
    - service-worker-builder to build service worker file in `app/react-apps/{your app name}\pwa\service-worker.js` for PWA app via work-box.
    