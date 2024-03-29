import {buildConfig} from '../../config/build-config.js';
import path from 'path';
import fs from 'fs';
/* webpack section */
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webPackHotMiddleware from "webpack-hot-middleware";
/* to analysis our app */
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { generalConfigServer } from '../../config/general-config-server.js';
import { resolvedAliases } from '../../config/path-aliases-config.js';
import { ServiceWorkerBuilder } from './service-worker-builder.js';
import TerserPlugin from 'terser-webpack-plugin';
import zlib from 'zlib';
import CompressionPlugin from 'compression-webpack-plugin'
import chalk from 'chalk';
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin';
import babelConfig from '../../config/babel.config.json' assert { type: 'json' }
export class ReactBuilder {
    constructor(app) {
        this.app = app;
        this.hotReloadStatus = buildConfig.reactApps.hotReload && generalConfigServer.env !== "production"
    }
    async buildReactApps(watch) {
        const inputOptions = this._getReactAppInputOption(buildConfig.reactApps.appList, watch);
        const outputOptions = this._getReactAppOutputOption();
        await this.buildReactApp(inputOptions, outputOptions, watch);
    }
    async buildReactApp(inputOptions, outputOptions, watch = true) {

        await this.deletePrevBuild(path.join(generalConfigServer.basePath, ...buildConfig.reactApps.baseOutputPath.split('/')));
        const compiler = webpack({
            ...inputOptions,
            output: outputOptions,
        });
        if (watch) {
            if (this.hotReloadStatus) {
                this.app.use(webpackMiddleware(compiler, { writeToDisk: true }));
                this.app.use(webPackHotMiddleware(compiler));
            } else {
                // eslint-disable-next-line no-unused-vars
                const watching = compiler.watch({
                    aggregateTimeout: 300,
                    ignored: /node_modules/,
                    poll: undefined
                },
                (err, stat) => { this._onWebpackStatCallback(err, stat); }
                );
            }
        } else {
            //TODO: will add extra build process log so we can debug in build process on production uncomment if you need it
            //new webpack.ProgressPlugin().apply(compiler);
            await this.runWebpackCompiler(compiler);
        }
    }
    /**
     * 
     * @param {webpack.compiler} compiler 
     */
    runWebpackCompiler(compiler){
        return new Promise((resolve, reject) => { 
            compiler.run((err, stat) => { 
                if(!err && !stat.hasErrors()){
                    resolve();
                }else{
                    reject();
                }
                this._onWebpackStatCallback(err, stat);
            });
         })
    }
    _onWebpackStatCallback(err, stats) {
        // if config are set incorrectly it throw err here
        if (err || stats.hasErrors()) {
            console.error(err);
            return;
        }
        // Done processing
        //TODO: uncomment log when you need extra log
        //console.log(stats);
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true // Shows colors in the console
        }));
    }
    _getReactAppOutputOption() {
        let outputOptions = {
            // core output options
            path: path.join(generalConfigServer.basePath, ...buildConfig.reactApps.baseOutputPath.split('/')),
            filename: "[name].js",
            //in production we make it id to make it less readable
            chunkFilename: generalConfigServer.env == "production" ? path.join('[name]@[contenthash].chunk.js') : path.join('[id]@[contenthash].chunk.js'),
            //sourceMapFilename: '[name][hash].[ext].map',
            publicPath: buildConfig.reactApps.basePublicPath,
        };
        return outputOptions;
    }
    _getReactAppInputOption(appList, watch) {
        const babelOption = ReactBuilder.getReactAppBabelOption();
        const entry = {};
        appList.forEach((reactApp) => {
            const entryPath = [path.join(generalConfigServer.basePath, ...reactApp.path.split('/'))];
            if (watch && this.hotReloadStatus) {
                entryPath.push('webpack-hot-middleware/client');
            }
            entry[path.join(reactApp.name, reactApp.name)] = entryPath;
        });
        let inputOptions = {
            entry: entry,
            mode: generalConfigServer.env,
            devtool: generalConfigServer.env == 'development' ? 'source-map' : false,
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
                new webpack.EnvironmentPlugin(['NODE_ENV', 'APP_STAGE', 'npm_package_version']),
                new webpack.SourceMapDevToolPlugin({
                    filename: 'sourcemaps/[file][contenthash].map[query]',
                    publicPath: `${generalConfigServer.siteURL}/dist/react-apps/`,
                    fileContext: 'public',
                    // fileContext : generalConfigServer.host
                  }),
                  new CaseSensitivePathsWebpackPlugin(),
            ],
            resolve: {
                alias: resolvedAliases,
                extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
                modules: [path.join(generalConfigServer.basePath, 'node_modules')],
            },
            resolveLoader: {
                modules: ["node_modules", path.join(generalConfigServer.basePath, 'node_modules')]
            },
        };
        if (watch && this.hotReloadStatus) {
            inputOptions.plugins.push(new webpack.HotModuleReplacementPlugin());
        }
        if (generalConfigServer.env == "development" && buildConfig.reactApps.enableAnalyzer) {
            inputOptions.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                generateStatsFile: true,
                statsFilename: 'webpack-bundle-analysis.json'
            }));
        }
        // inject serviceworker
        inputOptions.plugins.push(ServiceWorkerBuilder.getWebpackPluginConfig());
        if (generalConfigServer.env == "production") {
            inputOptions.optimization = {
                minimize: true,
                minimizer: [new TerserPlugin({
                    terserOptions: {
                        safari10: true,
                    }
                })],
            };
            //setup brotli
            inputOptions.plugins.push(new CompressionPlugin({
                //remove source map from br file
                exclude: /.*\.map$/,
                filename: '[file].br[query]',
                algorithm: "brotliCompress",
                test: /\.(js|css|html|svg)$/,
                compressionOptions: {
                    level: 11,
                    params: {
                        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                    },
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
            if(Array.isArray(op) && op[0] == "babel-plugin-styled-components" && generalConfigServer.env == "production"){
                //hide styled component component name in production build
                op[1]["displayName"]=false;
            }
        })
        return babelOption;
    }
    async deletePrevBuild(dir) {
        if (fs.existsSync(dir)) {
            console.log(`Deleting Previous Build Folder in ${dir}`);
            await this.deleteDir(dir);
        }else{
            return
        }
    }
    deleteDir(dir){
        return new Promise((resolve, reject) => { 
            fs.rm(dir, { recursive: true },()=>{
                console.log("Delete Previous Build ", chalk.bgGreen("FINISHED"));
                resolve();
            });
         })
    }
}