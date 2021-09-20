import sass from 'sass';
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import generalConfig from '../../Config/GeneralConfigServer.js';
import buildConfig from '../../Config/BuildConfig.js';

/**
 * @classdesc this class is responsible to convert sass file to css file
 */
class SassBuilder {
    constructor() {

    }
    buildSassFiles(watch) {
        const fileList = buildConfig.sassFiles;
        fileList.forEach((file) => {
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
        const filePath = path.join(generalConfig.basePath, ...fileConfig.path.split('/'));
        fs.watch(filePath, (event, fileName) => {
            if (fileName) {
                if (fsWait) return;
                fsWait = setTimeout(() => {
                    fsWait = false;
                }, 100);
            }
            if (fileName && event == "change") {
                this.buildSassFile(fileConfig);
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
            file: path.join(generalConfig.basePath, ...fileConfig.path.split('/')),
            sourceMap: generalConfig.env == "development",
            outputStyle: 'compressed',
            outFile: path.join(generalConfig.basePath, ...fileConfig.outputPath.split('/')),
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
}
export default SassBuilder;