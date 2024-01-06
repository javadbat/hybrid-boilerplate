# app folder
here we will write all front-ends code and assets.
here we have following folders:
- assets: all assets like fonts, images, videos, styles(css,scss), scripts(ts/js) will be placed here. please note that if you use images or styles in your react components you don't have to put them here in assets and you could place images or css beside your component file but you may place them here too. if you read `command/serve/static-routes.js` file you will see js and ts file are read from `dist` folder becuase these file require to be builded by rollup before they could be fetched by browser so you have to define them in build-config file.

- dist: all built file like react apps built file or page scss & scripts file will be place here. you can delete this file whenever you feel's right and avoid to put your hand written code in here (it's a place for machine generated code).

- react-apps: hybrid-boilerplate support multi app approach so you may define multiple react apps or single react app here. the app you create here must be defined in build-config file so it could be built and use in any page you need. first go to views and create your hbs or html file there then go to `command/serve/page-routes.js` and define it's controller then write controller and after that define react app in `config/build-config.js` and then build it and import builded file into your html.

- utils: js/ts file that used and import as a tool in other files must be placed here. these utils will be used by both react apps and pages js/ts files in `assets/scripts`. for separation of concern we define multiple utils folder but you can delete someof them and merge them into same folder base on your need.

- views: all HTML or handlebars file will be placed here to be rendered and returned by server. remember to define needed routes for each view in  `command/serve/page-routes.js`(please create controller in server folder for routes if you want a clean code).

- web-components: in hybrid boilerplate you can create web-component directly in app. please note that you need to define created web component in `build-config.js` to be built here and get usable in react-apps or any other pages.