import rollup from'rollup' ;
import path from 'path';
import Colors from 'colors';
import fs from 'fs';
import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import rollupJson from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import config from '../../Config/BuildConfig.js';
import rollupReplace from'@rollup/plugin-replace';
/* webpack section */
import webpack from 'webpack';
import generalConfig from'../../Config/GeneralConfigServer.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webPackHotMiddleware from "webpack-hot-middleware";

class Build {
    constructor(app) {
        this.app = app;
    }
    build(watch) {
        this.buildWebComponents(watch).then(() => {
            this.BuildPageModules(watch);
            this.buildReactApps(watch);
        });

    }
    buildWebComponents(watch) {
        const allPromises = [];
        config.webComponents.forEach((module) => {
            //TODO: write special function for just webComponent
            const buildPromise = this.BuildPageModule(module, watch);
            allPromises.push(buildPromise);
        });
        return Promise.all(allPromises);
    }
    BuildPageModules(watch) {
        config.pagesBundle.forEach((module) => {
            const moduleWatch = module.watch && watch;
            this.BuildPageModule(module, moduleWatch);
        });
    }

    BuildPageModule(module, watch = true) {
        const inputOptions = this._getInputOption(module);
        const outputOptions = this._getOutputOption(module);
        if (watch == false) {
            return this.buildModule(inputOptions, outputOptions);
        } else {
            return this.buildAndWatchModule(inputOptions, outputOptions, module);
        }
    }
    buildModule(inputOptions, outputOptions) {
        //build module with rollup without any watch or something
        let bundlePromise = rollup.rollup(inputOptions);
        bundlePromise.then(function (bundle) {
            bundle.write(outputOptions).then(function (output) {
                console.log(output.output[0].facadeModuleId.green);
            });
        }).catch((err)=>{
            console.error(err);
        });
        return bundlePromise;
    }
    buildAndWatchModule(inputOptions, outputOptions, module) {
        return new Promise((resolve, reject) => {
            let watcher = rollup.watch({
                ...inputOptions,
                output: outputOptions,
                watch: {
                    exclude: module.external
                }
            });
            this._watcherEventHandler(watcher, resolve, reject);
        });
    }
    _watcherEventHandler(watcher, resolver, rejecter) {
        watcher.on('event', event => {
            if (event.code === 'BUNDLE_START') {
                console.log('Bundling...');
            } else if (event.code === 'BUNDLE_END') {
                console.log(Colors.green(event.input + '\n' + 'Bundled in ' + event.duration + 'ms.'));
                resolver();
            } else if (event.code === 'ERROR' || event.code === 'FATAL') {
                console.error(Colors.red(event.error));
                rejecter();
            }
        });
    }
    _getInputOption(module) {
        let plugins = [
            html({
                include: '**/*.html'
            }),
            postcss({
                extensions: ['.css', '.pcss', 'scss'],
                inject: false,
                sourceMap: true
            }),
            resolve({
                preferBuiltins: true,
                mainFields: ['browser'],
                jsnext: true,
            }),
            rollupReplace({
                'process.env.NODE_ENV': `"${generalConfig.env}"`,
                'process.env.APP_STAGE': `"${generalConfig.appStage}"`,
            }),
            commonjs({
                include: ["./index.js", "node_modules/**"],
                ignoreGlobal: false,
                sourceMap: true
            }),
            rollupJson()
        ];
        let inputOptions = {
            input: path.join(...module.path.split('/')),
            external: module.external || [],
            plugins: plugins,
            //manualChunks: config.chuncks
        };
        return inputOptions;
    }
    _getOutputOption(module) {
        let outputOptions = {
            // core output options
            sourcemap: true,
            file: path.join(...module.outputPath.split('/')),
            format: 'es', //es for native code , system for systemjs known module
            //dir: 'App/dist',
        };
        return outputOptions;
    }
    deletePrevBuild(dir) {
        if(fs.existsSync(dir)){
            fs.rmdirSync(dir, { recursive: true });
        }
    }
    buildReactApps(watch){
        const inputOptions = this._getReactAppInputOption(config.reactApps.appList, watch);
        const outputOptions = this._getReactAppOutputOption();
        this.buildReactApp(inputOptions,outputOptions,watch);
    }
    buildReactApp(inputOptions,outputOptions,watch = true) {
        this.deletePrevBuild(path.join(generalConfig.basePath, ...config.reactApps.baseOutputPath.split('/')));

        const compiler = webpack({
            ...inputOptions,
            output: outputOptions,
        });
        if (watch) {
            if (config.reactApps.hotReload ) {
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
            path: path.join(generalConfig.basePath,...config.reactApps.baseOutputPath.split('/')),
            filename: "[name].js",
            chunkFilename: path.join('[name]-[contenthash].chunk.js'),
            sourceMapFilename: '[file].map',
            publicPath: config.reactApps.basePublicPath,
        };
        return outputOptions;
    }
    _getReactAppInputOption(appList, watch) {
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
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "@babel/plugin-syntax-dynamic-import"
            ]
        };
        const entry = {};
        appList.forEach((reactApp)=>{
            const entryPath = [path.join(generalConfig.basePath, ...reactApp.path.split('/'))];
            if(watch && config.reactApps.hotReload){
                entryPath.push('webpack-hot-middleware/client');
            }
            entry[ path.join(reactApp.name,reactApp.name) ] = entryPath;
        });
        let inputOptions = {
            entry:entry,
            mode: generalConfig.env,
            devtool: generalConfig.env == 'development' ? 'source-map' : false,
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: babelOption
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
                ]
            },
            plugins: [
                new webpack.EnvironmentPlugin(['NODE_ENV','APP_STAGE'])
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
        return inputOptions;
    }
}
export default Build;