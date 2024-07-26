import { ReactAppBuildConfig, SassBuildConfig, WebComponentBuildConfig } from "@config/types.ts";

export const pureJSBundles = [
    //you may bundle your pages js file and use it in your html file. you just had to add it here
    {
        name: 'index',
        path: '/app/assets/scripts/pages/index.ts',
        outputPath: '/app/dist/assets/scripts/pages/index.js',
        //for performance reason and due to limited of watching file you can made them not be watch even in development mode
        // in production mode they dont be watched
        watch: true,
    },

];
export const reactAppsConfig = {
    baseOutputPath: 'app/dist/react-apps',
    basePublicPath: '/dist/react-apps/',
    // apply change on the fly in your browser on change in development environment(NODE_ENV=development)
    hotReload: true,
    enableAnalyzer: false,
    // will minify your app on production mode(NODE_ENV=production)
    useMinifier: true
}
export const reactAppList:ReactAppBuildConfig[] = [
    //you can define multiple react apps here
    {
        name: 'sample-app',
        folderName: "sample-app",
        urlPrefix: "sample-app",
        viewFolderName: "sample-app",
        path: '/app/react-apps/sample-app/sample-app-bootstrapper.tsx',
    },
]
export const sassFiles: SassBuildConfig[] = [
    {
        path: '/app/assets/styles/pages/index.scss',
        outputPath: '/app/dist/assets/styles/pages/index.css',
        //you can make watch true to decrease build and watch overhead and run npm run build manually every time you need to build the sass file
        watch: true
    },
    {
        path: '/app/assets/styles/pages/sample-app.scss',
        outputPath: '/app/dist/assets/styles/pages/sample-app.css',
        //you can make watch true to decrease build and watch overhead and run npm run build manually every time you need to build the sass file
        watch: true
    }
];
export const webComponentConfigs = {
    useMinifier: true
}
export const webComponentList: WebComponentBuildConfig[] = [
    {
        name: 'project-build-info',
        path: '/app/web-components/project-build-info/lib/project-build-info.ts',
        outputPath: '/app/web-components/project-build-info/dist/project-build-info.js',
        umdName: "ProjectBuildInfo"
    },
]