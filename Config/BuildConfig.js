var buildConfig = {
    pagesBundle:[
        {
            name:'index',
            path:'/App/Assets/Js/Pages/Index.js',
            outputPath:'/App/dist/Assets/Js/Pages/Index.js',
            watch:true,
        },
        
    ],
    reactApps:{
        baseOutputPath:'App/dist/ReactApps',
        basePublicPath:'/dist/ReactApps/',
        hotReload:true,
        enableAnalyzer:false,
        useMinifier:true,
        appList:[
            {
                name:'SampleApp',
                path:'/App/ReactApps/SampleApp/SampleAppBootstrapper.js',
            },
        ]
    },
    webComponents : [
        //for example:
        // {
        //     name:'component-name',
        //     path:'/App/WebComponents/ComponentName/lib/ComponentName.js',
        //     outputPath:'/App/WebComponents/ComponentName/dist/ComponentName.js'
        // },
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