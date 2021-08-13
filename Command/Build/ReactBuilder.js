import config from '../../Config/BuildConfig.js';
import path from 'path';
import fs from 'fs';
/* webpack section */
import webpack from 'webpack';
import generalConfig from '../../Config/GeneralConfigServer.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webPackHotMiddleware from "webpack-hot-middleware";
/* to analysis our app */
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
export class ReactBuilder {
    constructor(app) {
        this.app = app;
    }
    buildReactApps(watch) {
        const inputOptions = this._getReactAppInputOption(config.reactApps.appList, watch);
        const outputOptions = this._getReactAppOutputOption();
        this.buildReactApp(inputOptions, outputOptions, watch);
    }
    buildReactApp(inputOptions, outputOptions, watch = true) {
        this.deletePrevBuild(path.join(generalConfig.basePath, ...config.reactApps.baseOutputPath.split('/')));

        const compiler = webpack({
            ...inputOptions,
            output: outputOptions,
        });
        if (watch) {
            if (config.reactApps.hotReload) {
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
            compiler.run((err, stat) => { this._onWebpackStatCallback(err, stat); });
        }
        // compiler.plugin('done', (ss) => { console.log(ss) })

    }
    _onWebpackStatCallback(err, stats) {
        // if config are set incorrectly it throw err here
        if (err || stats.hasErrors()) {
            console.error(err);
            return;
        }
        // Done processing
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true // Shows colors in the console
        }));
    }
    _getReactAppOutputOption() {
        let outputOptions = {
            // core output options
            path: path.join(generalConfig.basePath, ...config.reactApps.baseOutputPath.split('/')),
            filename: "[name].js",
            //in production we make it id to make it less readble
            chunkFilename: generalConfig.env=="production"?path.join('[id]@[contenthash].chunk.js'):path.join('[name]@[contenthash].chunk.js'),
            sourceMapFilename: '[file].map',
            publicPath: config.reactApps.basePublicPath,
        };
        return outputOptions;
    }
    _getReactAppInputOption(appList, watch) {
        const babelOption = ReactBuilder.getReactAppBabelOption();
        const entry = {};
        appList.forEach((reactApp) => {
            const entryPath = [path.join(generalConfig.basePath, ...reactApp.path.split('/'))];
            if (watch && config.reactApps.hotReload) {
                entryPath.push('webpack-hot-middleware/client');
            }
            entry[path.join(reactApp.name, reactApp.name)] = entryPath;
        });
        let inputOptions = {
            entry: entry,
            mode: generalConfig.env,
            devtool: generalConfig.env == 'development' ? 'source-map' : false,
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: babelOption,
                        resolve: {
                            fullySpecified: false
                        }
                    },
                    {
                        test: /\.s[ac]ss$/i,
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
                new webpack.EnvironmentPlugin(['NODE_ENV', 'APP_STAGE'])
            ],
            resolve: {
                extensions: ['*', '.js', '.jsx'],
                modules: [path.join(generalConfig.basePath, 'node_modules')],
            },
            resolveLoader: {
                modules: ["node_modules", path.join(generalConfig.basePath, 'node_modules')]
            },
        };
        if (watch && config.reactApps.hotReload) {
            inputOptions.plugins.push(new webpack.HotModuleReplacementPlugin());
        }
        if (generalConfig.env == "development" && config.reactApps.enableAnalyzer) {
            inputOptions.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                generateStatsFile: true,
                statsFilename: 'webpack-bundle-analysis.json'
            }));
        }
        return inputOptions;
    }
    static getReactAppBabelOption() {
        const babelOption = {
            presets: [
                ["@babel/preset-env", {
                    "targets": { "browsers": ["last 2 chrome versions"] },
                    "useBuiltIns": "usage",
                    "corejs": "3.6.5"
                }],
                "@babel/preset-react",
            ],
            plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                "@babel/plugin-proposal-optional-chaining",
                "@babel/proposal-nullish-coalescing-operator",
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "@babel/plugin-syntax-dynamic-import"
            ]
        };
        return babelOption;
    }
    deletePrevBuild(dir) {
        if(fs.existsSync(dir)){
            fs.rmdirSync(dir, { recursive: true });
        }
    }
}