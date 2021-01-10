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
| App_Stage        | dev, uat, release, main,... |

### command

set envirement variable
```
$env:APP_STAGE="dev"

``` 
