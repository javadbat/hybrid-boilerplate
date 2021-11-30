import sass from 'sass';
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import buildConfig from '../../Config/BuildConfig.js';
import { generalConfigServer } from '../../Config/GeneralConfigServer.js';

/**
 * @classdesc this class is responsible to convert sass file to css file
 */
class SassBuilder {
    constructor() {

    }
    buildSassFiles(watch) {
        const fileList = buildConfig.sassFiles;
        fileList.forEach((file) => {
            this.ensureDirectoryExistence(path.join(generalConfigServer.basePath, ...file.outputPath.split('/')));
            this.buildSassFile(file);
        });
        if (watch) {
            const watchList = fileList.filter(file => file.watch);
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
        sass.render(config, function (err, result) {
            if (!err) {
                fs.writeFile(config.outFile, result.css, (err) => {
                    if (!err) {
                        console.log(chalk.green(`${config.file} `), chalk.bgGreen.black(' BUILT '));
                    } else {
                        console.error(err);
                    }
                    //write map file
                    if (result.map) {
                        fs.writeFile(config.outFile + '.map', result.map, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }

                });
            } else {
                console.error(err);
            }
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
}
export default SassBuilder;