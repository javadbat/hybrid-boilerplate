import express from 'npm:express';
import cookieParser from 'npm:cookie-parser';
import tcpPortUsed from 'npm:tcp-port-used';
import chalk from 'npm:chalk';
import {serverConfig} from '@config/server-config.ts'
import StaticsRoutes from './static-routes.ts';
import PageRoutes from './page-routes.ts';
export class ExpressApp {
    app:any
    constructor() {
        this.app = express();
    }
    serve() {
        console.log('==================' + serverConfig.env.nodeEnv + '-' + serverConfig.env.appStage + '=============================');
        const app = this.app;
        const serveApp = function () {
            app.use(cookieParser());
            const staticRoutes = new StaticsRoutes(app);
            const pageRoutes = new PageRoutes(app);
            staticRoutes.init();
            pageRoutes.init();
            app.listen(serverConfig.port, serverConfig.host, function () {
                console.info('server is running on: ' + serverConfig.address.localAddress);
            });
        };
        //check if port is busy
        tcpPortUsed.check(serverConfig.port).then((isUsed:boolean) => {
            if (isUsed) {
                console.error(chalk.bold.red(`${serverConfig.port} port is busy please free up port or change your application port in server-config.ts`));
            } else {
                serveApp();
            }
        });
    }
}
