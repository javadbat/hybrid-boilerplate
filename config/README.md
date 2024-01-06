# config folder

This is the main configuration directory for your application. Any file in this directory will be used as a configs of app.
we have e type of configs here

1- configs that used in front-end(better be written in typescript)
2- config that used in back-end (written in javascript)
3- shared configs between both ( we don't have any by default)

## 1. Front End Configs: 

    - general-config.ts: singleton class that keeps most-important configs of your app like environments and address-config instance.
    - address-config.ts: all address of app like back-end API endpoints will be stored here. you can change the way it return addresses base on your needs.

## 2. Back End Configs:
    - general-config-server.js: this file will be only used in express back-end like app folder base path in OS, or app port and address & etc. you can define api keys or other data here. 
    - address-config-server.js: if you call any api endpoints in node back-ends you can store them here.
    - build-config.js: 
        this file contain's all information needed for build process like web-components-path , react-app names and paths, sass file paths ,... 
    - path-aliases-config.js:
    this file read ts-config.json file and extract path aliases of it to provide it to webpack and rollup builder.