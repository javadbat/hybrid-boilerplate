import chalk from "npm:chalk";
import {
webComponentConfigs,
  webComponentList,
} from "@config/build-config.ts";
import { serverConfig } from "@config/server-config.ts";
import * as path from "https://deno.land/std@0.207.0/path/mod.ts";
//rollup
import * as rollup from "npm:rollup";
import html from "npm:rollup-plugin-html";
import postcss from "npm:rollup-plugin-postcss";
import rollupJson from "npm:@rollup/plugin-json";
import resolve from "npm:@rollup/plugin-node-resolve";
import rollupReplace from "npm:@rollup/plugin-replace";
//config
//import typescript from '@rollup/plugin-typescript';
import typescript from "npm:rollup-plugin-typescript2";
// import InlineSvg from 'rollup-plugin-inline-svg';
import svg from "npm:rollup-plugin-svg";
import { ModuleFormat } from "npm:rollup";
import { WebComponentBuildConfig } from "@config/types.ts";
import rollupAlias from '@rollup/plugin-alias';
import { resolvedAliases } from "../../config/path-aliases-config.ts";
import brotli from "npm:rollup-plugin-brotli";
import { wasm } from 'npm:@rollup/plugin-wasm';
import terser from "npm:@rollup/plugin-terser";
export class WebComponentBuilder {
  async buildAllComponents() {
    for (const component of webComponentList) {
      await this.buildComponent(component);
    }
  }
  async buildComponent(componentBuildConfig: WebComponentBuildConfig, watch = false) {
    console.log(`start building ${componentBuildConfig.name}`);
    const inputOptions = this.#getInputOption(componentBuildConfig, 'es');
    const cjsInputOptions = this.#getInputOption(componentBuildConfig, 'cjs');
    const umdInputOptions = this.#getInputOption(componentBuildConfig, 'umd');
    //
    const esOutputOptions = this.#getOutputOption(componentBuildConfig, "es");
    const cjsOutputOptions = this.#getOutputOption(componentBuildConfig, "cjs");
    const umdOutputOptions = this.#getOutputOption(componentBuildConfig, "umd");
    try {
      if (watch) {
        this.#buildAndWatchModule(inputOptions, esOutputOptions, componentBuildConfig);
      } else {
        await this.buildModule(inputOptions, esOutputOptions, "ES");
        await this.buildModule(cjsInputOptions, cjsOutputOptions, "CJS");
        await this.buildModule(umdInputOptions, umdOutputOptions, "UMD");
      }
    } catch (e) {
      console.error(componentBuildConfig.name + ' build failed');
    }
  }
  buildModule(inputOptions: rollup.RollupOptions, outputOptions: rollup.OutputOptions, type: "ES" | "CJS" | "UMD") {
    //build module with rollup without any watch or something
    const bundlePromise = rollup.rollup(inputOptions);
    bundlePromise.then(function (bundle) {
      bundle.write(outputOptions).then(function (output) {
        console.log(chalk.greenBright(output.output[0].facadeModuleId), ' ', chalk.bgBlue(` ${type} `), ' ', chalk.bgMagenta(' DONE '));
      });
    }).catch((e) => {
      console.error(e.message);
    });
    return bundlePromise;
  }
  #buildAndWatchModule(inputOptions: rollup.RollupOptions, outputOptions: rollup.OutputOptions, module: WebComponentBuildConfig) {
    return new Promise<void>((resolve, reject) => {
      const watcher = rollup.watch({
        ...inputOptions,
        output: outputOptions,
        watch: {
          exclude: module.external
        }
      });
      this.#watcherEventHandler(watcher, resolve, reject);
    });
  }
  #watcherEventHandler(watcher: rollup.RollupWatcher, resolver: () => void, rejecter: () => void) {
    watcher.on('event', event => {
      if (event.code === 'BUNDLE_START') {
        console.log('Bundling...');
      } else if (event.code === 'BUNDLE_END') {
        console.log(chalk.green(event.input + '\n' + 'Bundled in ' + event.duration + 'ms.'));
        resolver();
      } else if (event.code === 'ERROR') {
        console.log(event);

        console.error(chalk.red((event as any).error));
        rejecter();
      }
      //rollup need to be closed on each result to free up space
      if ((event as any).result) {
        (event as any).result.close();
      }
    });
  }
  #getInputOption(module: WebComponentBuildConfig, format: "es" | "cjs" | "umd" = "es"): rollup.RollupOptions {
    // remove filename and lib folder name result in web-component/jb-input
    const moduleFolderPathArr = path.join(...module.path.split('/').slice(0, -2));
    let externalList = module.external || [];
    if (
      format == "umd" &&
      Array.isArray(module.umdIncludes) &&
      externalList.length > 0
    ) {
      externalList = externalList.filter(
        (el) => !module.umdIncludes?.includes(el)
      );
    }
    const env = serverConfig.env.nodeEnv;
    const plugins = [
      html({
        include: "**/*.html",
      }),
      svg({
        base64: false,
      }),
      //@ts-ignore
      postcss({
        extensions: [".css", ".pcss", "scss"],
        inject: false,
        sourceMap: false,
      }),
      //@ts-ignore
      resolve({
        preferBuiltins: true,
        mainFields: ["browser", "jsnext:main", "module", "main"],
        // jsnext: true,
      }),
      //@ts-ignore
      rollupReplace({
        'process.env.NODE_ENV': `"${serverConfig.env.nodeEnv}"`,
        'process.env.APP_STAGE': `"${serverConfig.env.appStage}"`,
        preventAssignment: true
      }),
      //@ts-ignore
      rollupJson(),
      //@ts-ignore
      rollupAlias({
        entries: resolvedAliases
      }),
      //@ts-ignore
      wasm({
        //@ts-ignore
        copy: true,
      }),
    ];
    const isTypeScriptModule = this.#isTypeScriptModule(module);
    if (isTypeScriptModule) {
      const tsConfigFilePath = module.tsconfigPath ? module.tsconfigPath : path.join(serverConfig.basePath, "tsconfig-modules.json");
      plugins.push(
        //@ts-ignore
        typescript({
          tsconfig: tsConfigFilePath,
          tsconfigDefaults: this.#getTypeScriptCompilerOptions(
            module,
            externalList
          ),
        })
      );
    }
    if (serverConfig.env.nodeEnv == "production") {
      if (webComponentConfigs.useMinifier) {
        //add minifier
        //@ts-ignore
        plugins.push(terser());
      }
      //add gzip brotli google algorithm
      plugins.push(brotli());
    }
    const inputOptions = {
      input: path.join(...module.path.split("/")),
      external: externalList,
      plugins: plugins,
      // treeshake:"smallest"
      //manualChunks: config.chuncks
    };
    return inputOptions;
  }
  #isTypeScriptModule(module: WebComponentBuildConfig) {
    const filePaths = module.path.split('/');
    const fileName = filePaths[filePaths.length - 1];
    const fileExtension = fileName.split('.').pop();
    return fileExtension === 'ts';
  }
  #getTypeScriptCompilerOptions(module: WebComponentBuildConfig, externalList: string[]) {
    const moduleFolderPath = module.path.split("/").slice(0, -1);
    const includePaths = path.join(
      ...moduleFolderPath,
      "**",
      "*"
    );

    return {
      useTsconfigDeclarationDir: true,
      compilerOptions: {
      },
      include: [includePaths],
      exclude: [...externalList],
    };
  }
  #getOutputOption(module: WebComponentBuildConfig, format: ModuleFormat = "es"): rollup.OutputOptions {
    const pathArr = module.outputPath.split('/');
    const fullFileName = pathArr[pathArr.length - 1];
    const fileName = path.parse(fullFileName).name;
    const fileExtension = path.parse(fullFileName).ext;
    const outputFileName = `${fileName}${format == 'es' ? '' : ('.' + format)}${fileExtension}`;
    const dir = pathArr.slice(0, pathArr.length - 1);
    const outputOptions = {
      // core output options
      sourcemap: true,
      dir: path.join(...dir),
      entryFileNames: outputFileName,
      format: format, //es for native code , system for systemjs known module, umd for umd package
    };
    if (format == "umd") {
      //@ts-ignore package is not standard
      outputOptions.name = module.umdName;
      //@ts-ignore package is not standard
      outputOptions.globals = module.globals || {};
    }
    return outputOptions;
  }
}
