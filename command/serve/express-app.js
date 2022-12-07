import { generalConfigServer } from '../../config/general-config-server';
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = generalConfigServer.env;
}
if (!process.env.APP_STAGE) {
    process.env.APP_STAGE = generalConfigServer.appStage;
}
console.log('==================' + process.env.NODE_ENV + '-' + process.env.APP_STAGE + '=============================');
import express from 'express';
import StaticsRoutes from './static-routes.js';
import PageRoutes from './page-routes.js';
import cookieParser from 'cookie-parser';
import tcpPortUsed from 'tcp-port-used';
import chalk from 'chalk';
export class ExpressApp {
    constructor() {
        this.app = express();
    }
    serve() {
        const app = this.app;
        const serveApp = function () {
            app.use(cookieParser());
            var staticRoutes = new StaticsRoutes(app, generalConfigServer);
            var pageRoutes = new PageRoutes(app, generalConfigServer);
            staticRoutes.init();
            pageRoutes.init();
            app.listen(generalConfigServer.port, generalConfigServer.host, function () {
                console.info('server is running on: http://localhost:' + generalConfigServer.port);
            });
        };
        //check if port is busy
        tcpPortUsed.check(generalConfigServer.port).then((isUsed) => {
            if (isUsed) {
                console.error(chalk.bold.red(`${generalConfigServer.port} port is busy please free up port or change your application port in GeneralConfig.js`));
            } else {
                serveApp();
            }
        });
    }
}
