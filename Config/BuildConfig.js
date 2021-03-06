var config = {
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
        appList:[
            {
                name:'SampleApp',
                path:'/App/ReactApps/SampleApp/SampleAppBootstrapper.js',
            },
        ]
    },
    webComponents : [
    ]
};
export default config;