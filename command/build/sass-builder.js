import * as sass from 'sass';
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import {buildConfig} from '../../config/build-config.js';
import { generalConfigServer } from '../../config/general-config-server.js';
import brotli from 'brotli';
/**
 * @classdesc this class is responsible to convert sass file to css file
 */
class SassBuilder {
    constructor() {
        this.isWatchMode = false;

    }
    async buildSassFiles(watch) {
        const fileList = buildConfig.sassFiles;
        for(const file of fileList){
            this.ensureDirectoryExistence(path.join(generalConfigServer.basePath, ...file.outputPath.split('/')));
            await this.buildSassFile(file);
        }
        if (watch) {
            const watchList = fileList.filter(file => file.watch);
            this.isWatchMode = true;
            if (watchList.length > 0) {
                this.watchSassFiles(watchList);
            }
        }
    }
    watchSassFiles(fileList) {
        fileList.forEach((file) => {
            this.watchSassFile(file);
        });
    }
    /**
     * watch sass file for change and recomile after every change
     * @param {*} fileConfig 
     */
    watchSassFile(fileConfig) {

        let fsWait = false;
        const filePath = path.join(generalConfigServer.basePath, ...fileConfig.path.split('/'));
        fs.watch(filePath, (event, fileName) => {
            if (fileName) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, 300);
            }
            if (fileName && event == "change") {
                setTimeout(() => {
                    this.buildSassFile(fileConfig);
                }, 300);
            }
        });
    }
    
    /**
     *
     * build css file from scss file
     * @param {{path:String,outputPath:String}} fileConfig
     * @memberof SassBuilder
     */
    buildSassFile(fileConfig) {
        const config = {
            file: path.join(generalConfigServer.basePath, ...fileConfig.path.split('/')),
            sourceMap: generalConfigServer.env == "development",
            outputStyle: 'compressed',
            outFile: path.join(generalConfigServer.basePath, ...fileConfig.outputPath.split('/')),
        };
        sass.render(config, (err, result) => {
            this.onCompileFinish(fileConfig,err, result, config.file, config.outFile);
        });
    }
    ensureDirectoryExistence(filePath) {
        //make sure css file directory is exist or create it
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        this.ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }
    compressSassFile(fileContent) {
        const result = brotli.compress(fileContent, { lgwin: 22, mode: 1, quality: 11 });
        return result;
    }
    /**
     * 
     * @param {sass.LegacyException} err 
     * @param {sass.LegacyResult} result
     * @param {String} sourceFilePath
     * @param {String} outputFilePath
     */
    onCompileFinish(fileConfig,err, result, sourceFilePath, outputFilePath) {
        if (!err) {
            const compressedFile = this.compressSassFile(result.css);
            fs.writeFile(outputFilePath + '.br', compressedFile,(err) => {
                if (err) {
                    console.error(err);
                }
            });
            fs.writeFile(outputFilePath, result.css, (err) => {
                if (!err) {
                    console.log(chalk.green(`${sourceFilePath} `), chalk.bgGreen.black(' BUILT '));
                    //fileConfig.dependacyList will make sure that dep list is only added for watch for first time
                    if(this.isWatchMode && fileConfig.dependacyList == undefined){
                    //TODO: check each file watch config
                    fileConfig.dependacyList = result.stats.includedFiles;
                    fileConfig.dependacyList.forEach((dep)=>{
                        this.watchDependancy(dep,fileConfig);
                    });
                    }

                } else {
                    console.error(err);
                }
                //write map file
                if (result.map) {
                    fs.writeFile(outputFilePath + '.map', result.map, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

            });
        } else {
            console.error(err);
        }

    }
    watchDependancy(depPath,fileConfig){
        let fsWait = false;
        fs.watch(depPath, (event, fileName) => {
            if (fileName) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, 300);
            }
            if (fileName && event == "change") {
                setTimeout(() => {
                    this.buildSassFile(fileConfig);
                }, 300);
            }
        });
    }
}
export default SassBuilder;