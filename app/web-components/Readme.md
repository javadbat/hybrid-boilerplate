# Web Components

web-components are new web standard to create encapsulate component for web browser environment.
web-component help developer to make a balck-box for each component to protect them from DOM manipulation and style override from outside of component scope, yet they still let you define a way for user of the component to customize component in standard defined way.

## define new web-component 

hybrid boilerplate let you denine and build your custom web-component in your source code and build it for you with Rollup.    
to define new web-component plese go to `config/build-config` and add your web-component there so we can build it.    
`
...js
webComponents:[
    {
        name:'your-web-component-name',
        //wc source code entry file
        path:'/app/web-components/your-wc-path/.../file.js(or ts)',
        //source file will be transpiled and build by rollup and builded file will be placed(written) in given path.
        outputPath:'/app/web-components/your-wc-builded-file--destination-path/.../file.js(or ts)'
    }
]
`
## customize build process

to customize build process change `command\build\build-module.js` file base on your needs