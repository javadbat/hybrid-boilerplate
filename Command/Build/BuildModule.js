import { rollup, watch } from 'rollup';
import path from 'path';
import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import rollupJson from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import config from '../../Config/BuildConfig.js';
import rollupReplace from '@rollup/plugin-replace';
import rollupAlias from '@rollup/plugin-alias';
import { terser } from "rollup-plugin-terser";
import SassBuilder from './SassBuilder.js';
import { ReactBuilder } from './ReactBuilder.js';
import { generalConfigServer } from '../../Config/GeneralConfigServer.js';
import { resolvedAliases } from '../../Config/PathAliasesConfig.js';
import typescript from 'rollup-plugin-typescript2';
import chalk from 'chalk';
import brotli from "rollup-plugin-brotli";
/**
 * @classdesc responible to build project files like react apps, web components or sass files
 */
class Build {
    constructor(app) {
        this.sassBuilder = new SassBuilder();
        this.reactBuilder = new ReactBuilder(app);
        this.app = app;
    }
    build(watch) {
        this.buildWebComponents(watch).then(() => {
            this.BuildPageModules(watch);
            this.reactBuilder.buildReactApps(watch);
        });
        this.sassBuilder.buildSassFiles(watch);

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
        let bundlePromise = rollup(inputOptions);
        bundlePromise.then(function (bundle) {
            bundle.write(outputOptions).then(function (output) {
                console.log(output.output[0].facadeModuleId.green);
            });
        }).catch((err) => {
            console.error(err);
        });
        return bundlePromise;
    }
    buildAndWatchModule(inputOptions, outputOptions, module) {
        return new Promise((resolve, reject) => {
            let watcher = watch({
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
                console.log(chalk.green(event.input + '\n' + 'Bundled in ' + event.duration + 'ms.'));
                resolver();
            } else if (event.code === 'ERROR' || event.code === 'FATAL') {
                console.error(chalk.red(event.error));
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
                'process.env.NODE_ENV': `"${generalConfigServer.env}"`,
                'process.env.APP_STAGE': `"${generalConfigServer.appStage}"`,
                preventAssignment: true
            }),
            commonjs({
                include: ["./index.js", "node_modules/**"],
                ignoreGlobal: false,
                sourceMap: true
            }),
            rollupAlias({
                entries: resolvedAliases
            }),
            rollupJson(),
        ];
        const isTypeScriptModule = this._isTypeScriptModule(module);
        if (isTypeScriptModule) {
            plugins.push(typescript({ tsconfigDefaults: this._getTypeScriptCompilerOptions(module) }));
        }
        if (generalConfigServer.env == "production") {
            if (config.reactApps.useMinifier) {
                //add minifier
                plugins.push(terser());
            }
            //add gzip brotli google algorithm
            plugins.push(brotli());
        }
        let inputOptions = {
            input: path.join(...module.path.split('/')),
            external: module.external || [],
            plugins: plugins,
            //manualChunks: config.chuncks
        };
        return inputOptions;
    }
    _isTypeScriptModule(module) {
        const filePaths = module.path.split('/');
        const fileName = filePaths[filePaths.length - 1];
        const fileExtension = fileName.split('.').pop();
        return fileExtension === 'ts';
    }
    _getTypeScriptCompilerOptions(module) {
        const includePaths = path.join(...module.path.split('/').slice(0, -1)) + '/**/*';
        const externalModules = module.external || [];
        return {
            "compilerOptions": {
                "target": "es2020",
                "module": "es2020",
                "moduleResolution": "node",
                "allowSyntheticDefaultImports": true,
                "sourceMap": true,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true,
                "removeComments": false,
                "noImplicitAny": false,
                "suppressImplicitAnyIndexErrors": true,
                "noLib": false,
                "preserveConstEnums": true,
                "suppressExcessPropertyErrors": true,
                "allowJs": true,
                "declaration": true,
                "declarationDir": './',
                "declarationMap": false,
                // "outDir": "../dist",
            },
            "include": [
                includePaths,
            ],
            "exclude": [
                ...externalModules
            ]

        };
    }
    _getOutputOption(module) {
        let outputOptions = {
            // core output options
            sourcemap: generalConfigServer.env == "development",
            file: path.join(...module.outputPath.split('/')),
            format: 'es', //es for native code , system for systemjs known module
            //dir: 'App/dist',
        };
        return outputOptions;
    }



}
export default Build;