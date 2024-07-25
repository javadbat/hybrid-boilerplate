import { compileAsync, CompileResult } from 'npm:sass';
import chalk from 'npm:chalk';
import * as path from "jsr:@std/path";
import { existsSync } from "jsr:@std/fs";
import { sassFiles } from '@config/build-config.ts';
import { serverConfig } from '@config/server-config.ts';
import brotli from 'npm:brotli';
import { SassBuildConfig } from "@config/types.ts";
/**
 * @classdesc this class is responsible to convert sass file to css file
 */
class SassBuilder {
    #isWatchMode = false;
    constructor() {

    }
    async buildSassFiles(watch: boolean) {
        const fileList = sassFiles;
        for (const file of fileList) {
            this.ensureDirectoryExistence(path.join(serverConfig.basePath, ...file.outputPath.split('/')));
            await this.buildSassFile(file);
        }
        if (watch) {
            const watchList = fileList.filter(file => file.watch);
            this.#isWatchMode = true;
            if (watchList.length > 0) {
                this.watchSassFiles(watchList);
            }
        }
    }
    watchSassFiles(fileList: SassBuildConfig[]) {
        fileList.forEach((file) => {
            this.watchSassFile(file);
        });
    }
    /**
     * watch sass file for change and recomile after every change
     */
    async watchSassFile(fileConfig: SassBuildConfig) {

        let fsWait: false | number = false;
        const filePath = path.join(serverConfig.basePath, ...fileConfig.path.split('/'));
        const watcher = Deno.watchFs(filePath);
        for await (const event of watcher) {
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 300);
            if (event.kind == "modify") {
                setTimeout(() => {
                    this.buildSassFile(fileConfig);
                }, 300);
            }
        }
    }

    buildSassFile(fileConfig: SassBuildConfig) {
        return new Promise<void>((resolve, reject) => {
            const buildPath = path.join(serverConfig.basePath, ...fileConfig.path.split('/'));
            const config = {
                sourceMap: serverConfig.env.nodeEnv == "development",
                outputStyle: 'compressed',
                outFile: path.join(serverConfig.basePath, ...fileConfig.outputPath.split('/')),
            };

            compileAsync(buildPath, config).then((result) => {
                this.onCompileFinish(fileConfig, result, buildPath, config.outFile);
                return resolve();
            }).catch((err) => {
                console.error(err);
                return reject();
            });
        })

    }
    ensureDirectoryExistence(filePath: string) {
        //make sure css file directory is exist or create it
        const dirname = path.dirname(filePath);
        if (existsSync(dirname)) {
            return true;
        }
        this.ensureDirectoryExistence(dirname);
        Deno.mkdirSync(dirname);
    }
    compressSassFile(fileContent: string) {
        const result = brotli.compress(fileContent, { lgwin: 22, mode: 1, quality: 11 });
        return result;
    }
    async onCompileFinish(fileConfig: SassBuildConfig, result: CompileResult, sourceFilePath: string, outputFilePath: string) {
        try {
            const compressedFile = this.compressSassFile(result.css);
            await Deno.writeTextFile(outputFilePath + '.br', compressedFile)
            await Deno.writeTextFile(outputFilePath, result.css);
            console.log(chalk.green(`${sourceFilePath} `), chalk.bgGreen.black(' BUILT '));
            //fileConfig.dependencyList will make sure that dep list is only added for watch for first time
            if (this.#isWatchMode && fileConfig.dependencyList == undefined) {
                //TODO: check each file watch config
                fileConfig.dependencyList = result.loadedUrls.map((x) => x.pathname);
                fileConfig.dependencyList.forEach((dep) => {
                    this.watchDependency(dep, fileConfig);
                });
            }
            //write map file
            if (result.sourceMap?.file) {
                await Deno.writeTextFile(outputFilePath + '.map', result.sourceMap.file)
            }
        } catch (err) {
            console.error(err);
        }


    }
    async watchDependency(depPath: string, fileConfig: SassBuildConfig) {
        const depStandardPath = path.join(...(depPath.split('/').filter(x=>x)));
        try {
            const watcher = Deno.watchFs(depStandardPath,{recursive:true});
            for await (const event of watcher) {
                console.log(depStandardPath,event.kind);
                if (event.kind == "modify") {
                    setTimeout(() => {
                        this.buildSassFile(fileConfig);
                    }, 300);
                }
            }
        }catch(err){
            console.error(err,depPath);
            
        }
       
    }
}
export default SassBuilder;