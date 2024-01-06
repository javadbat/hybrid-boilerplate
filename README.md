<div align="center">
  <a href="">
    <img width="200" height="200" src="https://raw.githubusercontent.com/javadbat/hybrid-boilerplate/45321137ccab9ed26fe209d5b525d5796f799735/App/Assets/Images/logo.svg">
  </a>
  <br>
  <br>
</div>

# hybrid-boilerplate
boilerplate suitable for project that need React for app and client side and handlebar for server side rendering.    
this boilerplate use Rollup to Build `web-component` and pages and use webpack to run react and has live module reloading too.    
you can have simple server rendered html css js web-component for website and multiple react app in one project with shared dependancy    
we have web-component builder so you can build your own web component in project    
we use multi staging app setting additional to `NODE_ENV` so you can choose if you want to build in production mode or develop mode and by set `APP_STAGE` env variable for your internal use such as choose right URL base on your envirement or log strategy or other logical reason you have `dev`, `uat`, `release`, `main` ,...    
you can have multi react app and multi non react page with customizable url    
you can load data in nodejs server and render it serverside for SEO need    

## stack
- ReactJS
- MobX
- Handlebar
- Sass
- ExpressJs
- Rollup
- Webpack
- Rust

## usage

### for development

 1- clone the project    
 2- run `npm i`    
 3- run `npm start`    
### for production     

 1- clone from your git
 2- run `npm i`    
 3- set `NODE_ENV` and `APP_STAGE`    
 4- run `npm run build`    
 5- run `npm run serve`

## environment variables

| env variable name| values                      |
| -------------    | -------------               |
| NODE_ENV         | development, production     |
| App_Stage        | dev, test, release, main,... |

### commands

set envirement variable on windows:

```command
$env:APP_STAGE="dev"

```

we have 3 main command in our boilerplate 

1- `build`: this command will build your source code using rollup & webpack and store built file in app/dist folder. remember that `app/dist` don't contain all of your apps source and just contain builded source so other assetsand filed are needed to run the project.
2- `serve`: will run built application so you can see app with browser
3- `start`: will build and serve app. this command will run build in watch mode so you must run it only in development env.
see React apps webpack analytics report:

```command
npm run analysis
```

it will open analytic report of your app package so you can detect heavy package of your app. remember you cant run this command before you build your project and you have to build your project once before run this command.

build wasm projects:    
open terminal in project root ant type
```command
wasm-pack build --target web
```
### using WASM
```bash
cargo install wasm-pack  
```
build wasm projects:  
we just put hello-world lib as a sample in wasm folder. you can modify it or create new WASM library in wasm folder.
```command
cargo new --lib wasm/hello-wasm2
```
After that to biuld your library do the following:  
open terminal in project root folder for example wasm/hello-world and type
```command
wasm-pack build --target web
```
## styling
### sass

hybrid-boilerplate support sass for hbs , html , web-component and react apps.
in web-component and react apps ypu can easily import sass file in your js/ts file:

```js
import './style.scss';
```
for handlebar or simple html file you may compile scss to css, then use it in your page. to doso you should add your sass file to `config/build-config.js` in `sassFiles` section like this:

```js
sassFiles:[
        {
            //orginal path of file
            path:'/app/assets/styles/pages/your-file.scss',
            //determine where we put compiled css after compile
            outputPath:'/app/dist/assets/styles/pages/your-file.css',
            //you can make watch true to decrease build and watch overhead and run npm run build manually every time you need to build the sass file
            watch:true
        },
    ]
```
and then use link tag in your html file to access compiled css

### styled component
you can use styled component only in react apps by just writing them and importing them in your component.
we recommend to define your global styles class in sass files and define your specific element and components styles in styled component files to make your code flexible and maintainable as best as it could be.

## folder structure:

- app: all front-end code will be placed here. learn more...
- command: executable npm commands like `serve` and `build` will be code there. learn more...
- config: whole app configs are placed there. learn more...
- server: if you have custom express server
- wasm: for rust wasm code if you have one.