import {serverConfig} from '@config/server-config.ts';
import {reactAppList,reactAppsConfig} from '@config/build-config.ts';
import * as path from 'jsr:@std/path';
import * as fs from 'jsr:@std/fs';
/* webpack section */
import webpack from 'npm:webpack';
import webpackMiddleware from 'npm:webpack-dev-middleware';
import webPackHotMiddleware from "npm:webpack-hot-middleware";
/* to analysis our app */
import WebpackBundleAnalyzer from 'npm:webpack-bundle-analyzer';
import { resolvedAliases } from '@config/path-aliases-config.ts';
import { ServiceWorkerBuilder } from './service-worker-builder.ts';
import TerserPlugin from 'npm:terser-webpack-plugin';
import zlib from 'npm:zlib';
import CompressionPlugin from 'npm:compression-webpack-plugin'
import chalk from 'npm:chalk';
import CaseSensitivePathsWebpackPlugin from 'npm:case-sensitive-paths-webpack-plugin';
import babelConfig from '@config/babel.config.json' with { type: 'json' }
import { ReactAppBuildConfig } from "@config/types.ts";
export class ReactBuilder {
    #app:any
    #hotReloadStatus:boolean;
    get isProduction(){
        return serverConfig.env.nodeEnv == "production";
    }
    constructor(app:any) {
        this.#app = app;
        this.#hotReloadStatus = reactAppsConfig.hotReload && !this.isProduction
    }
    async buildReactApps(watch:boolean) {
        const inputOptions = this.#getReactAppInputOption(reactAppList, watch);
        const outputOptions = this.#getReactAppOutputOption();
        const webpackConfig:webpack.Configuration = {
            ...inputOptions,
            output: outputOptions,
        }
        await this.buildReactApp(webpackConfig, watch);
    }
    async buildReactApp(webpackConfig:webpack.Configuration, watch = true) {

        await this.deletePrevBuild(path.join(serverConfig.basePath, ...reactAppsConfig.baseOutputPath.split('/')));
        const compiler = webpack(webpackConfig);
        if (watch) {
            if (this.#hotReloadStatus) {
                this.#app.use(webpackMiddleware(compiler, { writeToDisk: true }));
                this.#app.use(webPackHotMiddleware(compiler));
            } else {
                // eslint-disable-next-line no-unused-vars
                const watching = compiler.watch({
                    aggregateTimeout: 300,
                    ignored: /node_modules/,
                    poll: undefined
                },
                (err, stat) => { this.#onWebpackStatCallback(err, stat); }
                );
            }
        } else {
            //TODO: will add extra build process log so we can debug in build process on production uncomment if you need it
            //new webpack.ProgressPlugin().apply(compiler);
            await this.runWebpackCompiler(compiler);
        }
    }
    runWebpackCompiler(compiler:webpack.Compiler){
        return new Promise<void>((resolve, reject) => { 
            compiler.run((err, stat) => { 
                if(!err && !stat?.hasErrors()){
                    resolve();
                }else{
                    console.error(err,stat?.compilation.getErrors());
                    reject();
                }
                this.#onWebpackStatCallback(err, stat);
            });
         })
    }
    #onWebpackStatCallback(err:Error | null, stats:webpack.Stats | undefined) {
        // if config are set incorrectly it throw err here
        if (err || stats?.hasErrors()) {
            console.error(err);
            return;
        }
        // Done processing
        //TODO: uncomment log when you need extra log
        // console.log(stats);
        console.log(stats?.toString({
            chunks: false, // Makes the build much quieter
            colors: true // Shows colors in the console
        }));
    }
    #getReactAppOutputOption() {
        const outputOptions = {
            // core output options
            path: path.join(serverConfig.basePath, ...reactAppsConfig.baseOutputPath.split('/')),
            filename: "[name].js",
            //in production we make it id to make it less readable
            chunkFilename: this.isProduction ? path.join('[name]@[contenthash].chunk.js') : path.join('[id]@[contenthash].chunk.js'),
            //sourceMapFilename: '[name][hash].[ext].map',
            publicPath: reactAppsConfig.basePublicPath,
        };
        return outputOptions;
    }
    #getReactAppInputOption(appList:ReactAppBuildConfig[], watch:boolean):Partial<webpack.Configuration>{
        const babelOption = ReactBuilder.getReactAppBabelOption();
        const entry:Record<string,string[]> = {};
        appList.forEach((reactApp) => {
            const entryPath = [path.join(serverConfig.basePath, ...reactApp.path.split('/'))];
            if (watch && this.#hotReloadStatus) {
                entryPath.push('webpack-hot-middleware/client');
            }
            entry[path.join(reactApp.name, reactApp.name)] = entryPath;
        });
        const inputOptions:Partial<webpack.Configuration> = {
            entry: entry,
            mode: serverConfig.env.nodeEnv,
            devtool: this.isProduction ? false: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.(js|jsx|ts|tsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: babelOption,
                        resolve: {
                            fullySpecified: false
                        }
                    },
                    {
                        test: /\.(s[ac]ss|css)$/i,
                        use: [
                            // Creates `style` nodes from JS strings
                            'style-loader',
                            // Translates CSS into CommonJS
                            'css-loader',
                            // Compiles Sass to CSS
                            'sass-loader',
                        ],
                    },
                    {
                        test: /\.html$/i,
                        loader: 'html-loader',
                    },
                    {
                        test: /\.(png|jpg|gif)$/i,
                        type: 'asset/resource',
                        generator: {
                            filename: 'assets/images/[contenthash][ext][query]'
                        }
                    },
                    {
                        test: /\.svg/,
                        use: ['@svgr/webpack']
                    },
                ]
            },
            plugins: [
                new webpack.EnvironmentPlugin({ 'NODE_ENV': serverConfig.env.nodeEnv, 'APP_STAGE':serverConfig.env.appStage, 'npm_package_version':serverConfig.appVersion }),
                new webpack.SourceMapDevToolPlugin({
                    filename: 'sourcemaps/[file][contenthash].map[query]',
                    publicPath: `${serverConfig.address.siteUrl}/dist/react-apps/`,
                    fileContext: 'public',
                    // fileContext : generalConfigServer.host
                  }),
                  new CaseSensitivePathsWebpackPlugin(),
            ],
            resolve: {
                alias: resolvedAliases,
                extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
                modules: [path.join(serverConfig.basePath, 'node_modules')],
            },
            resolveLoader: {
                modules: ["node_modules", path.join(serverConfig.basePath, 'node_modules')]
            },
        };
        if (watch && this.#hotReloadStatus) {
            inputOptions.plugins?.push(new webpack.HotModuleReplacementPlugin());
        }
        if (!this.isProduction && reactAppsConfig.enableAnalyzer) {
            inputOptions.plugins?.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                generateStatsFile: true,
                statsFilename: 'webpack-bundle-analysis.json'
            }));
        }
        // inject service worker
        inputOptions.plugins?.push(ServiceWorkerBuilder.getWebpackPluginConfig());
        if (this.isProduction) {
            inputOptions.optimization = {
                minimize: true,
                minimizer: [new TerserPlugin({
                    terserOptions: {
                        safari10: true,
                    }
                })],
            };
            //setup brotli
            inputOptions.plugins?.push(new CompressionPlugin({
                //remove source map from br file
                exclude: /.*\.map$/,
                filename: '[file].br[query]',
                algorithm: "brotliCompress",
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    level: 11,
                    //comment due to typescript error
                    // params: {
                    //     [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                    // },
                },
                deleteOriginalAssets: false,
            }))
        }
        return inputOptions;
    }
    static getReactAppBabelOption() {
        // const babelOption = {
        //     presets: [
        //         ["@babel/preset-env", {
        //             "targets": { "browsers": ["last 2 chrome versions"] },
        //             "useBuiltIns": "usage",
        //             "corejs": "3.6.5",
        //             "loose": true
        //         }],
        //         "@babel/preset-react",
        //         "@babel/preset-typescript",
        //     ],
        //     plugins: [
        //         ["@babel/plugin-proposal-decorators", { "legacy": true }],
        //         "@babel/plugin-proposal-optional-chaining",
        //         "@babel/proposal-nullish-coalescing-operator",
        //         ["@babel/plugin-transform-private-methods", { loose: true }],
        //         ["@babel/plugin-proposal-class-properties", { loose: true }],
        //         "@babel/plugin-syntax-dynamic-import",
        //         //TODO: see https://github.com/Igorbek/typescript-plugin-styled-components for typescript compatibility
        //         ["babel-plugin-styled-components",{"ssr": false,"displayName": generalConfigServer.env !== "production","pure": true,"transpileTemplateLiterals": false}]
        //     ]
        // };
        const babelOption = babelConfig;
        babelOption.plugins.find((op)=>{
            if(Array.isArray(op) && op[0] == "babel-plugin-styled-components" && serverConfig.env.nodeEnv == "production"){
                //hide styled component component name in production build
                //@ts-ignore
                op[1]["displayName"]=false;
            }
        })
        return babelOption;
    }
    async deletePrevBuild(dir:string) {
        if (fs.existsSync(dir)) {
            console.log(`Deleting Previous Build Folder in ${dir}`);
            await this.deleteDir(dir);
        }else{
            return
        }
    }
    deleteDir(dir:string){
        return new Promise<void>((resolve, reject) => { 
            Deno.remove(dir, { recursive: true }).then(()=>{
                console.log("Delete Previous Build ", chalk.bgGreen("FINISHED"));
                resolve();
            }).catch((err)=>{
                console.error(err);
                reject(err)
            })
         })
    }
}