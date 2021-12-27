var buildConfig = {
    //you may bundle your pages js file and use it in your html file. you just had to add it here
    pagesBundle:[
        {
            name:'index',
            path:'/App/Assets/Js/Pages/Index.js',
            outputPath:'/App/dist/Assets/Js/Pages/Index.js',
            //for performance reason and due to limited of watching file you can made them not be watch even in development mode
            // in production mode they dont be watched
            watch:true,
        },
        
    ],
    reactApps:{
        baseOutputPath:'App/dist/ReactApps',
        basePublicPath:'/dist/ReactApps/',
        // apply change on the fly in your browser on change in development envirement(NODE_ENV=development)
        hotReload:true,
        enableAnalyzer:false,
        // will minify your app on production mode(NODE_ENV=production)
        useMinifier:true,
        appList:[
            //you can define multiple react apps here
            {
                name:'SampleApp',
                path:'/App/ReactApps/SampleApp/SampleAppBootstrapper.js',
            },
        ]
    },
    webComponents : [
        {
            name:'project-build-info',
            path:'/App/WebComponents/project-build-info/lib/ProjectBuildInfo.js',
            outputPath:'/App/WebComponents/project-build-info/dist/ProjectBuildInfo.js'
        },
    ],
    sassFiles:[
        {
            path:'/App/Assets/Scss/Pages/Index.scss',
            outputPath:'/App/Assets/Css/Pages/Index.css',
            //you can make watch true to decrease build and watch overhead and run npm run build manually every time you need to build the sass file
            watch:true
        }
    ]
};
export default buildConfig;