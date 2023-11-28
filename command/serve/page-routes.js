import path from 'path';
import exphbs from 'express-handlebars';
import SampleAppController from '../../server/controllers/sample-app-controller.js';
import {generalConfigServer} from '../../config/general-config-server.js';
import { buildConfig } from '../../config/build-config.js';
class PageRoutes {
    constructor(app, config) {
        this.app = app;
        this.appConfig = config;
        this.appPath = 'app';
        this.viewsDirectory = 'views';
        this.viewsPath = path.join(this.appConfig.basePath, this.appPath, this.viewsDirectory);
    }
    init() {
        //read express.Router() doc for dynamic and more complex route
        //read req.is to specify diffrent resualt for different request type
        //set handlebar template engine
        this.app.set('views', this.viewsPath);
        let hbs = exphbs.create({
            extname: '.hbs',
            helpers: {
                // TODO: impl real helper like date convertor
                isEqual: function (arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                },
            },
            layoutsDir: 'Layouts',
            defaultLayout: false,
            //helpers      : 'path/to/helpers/directory',
            partialsDir: path.join(this.viewsPath, 'partials')
        });
        this.app.engine('.hbs', hbs.engine);
        this.app.set('view engine', '.hbs');
        // end of handlebar template engine setup
        //setup controllers
        this.sampleAppController = new SampleAppController;
        this.registerRoutes();
    }
    registerRoutes() {
        this.app.get('/', this.indexPage.bind(this));
        this.app.use(`/${buildConfig.reactApps.appList[0].urlPrefix}`,this.sampleAppController.router);
        // here you can add your own custom page routes they may be a html page route or react app page route
    }
    indexPage(req, res) {
        const hbsData = {
            version: process.env.npm_package_version,
            buildEnv:generalConfigServer.env,
            appStage:generalConfigServer.appStage
        };
        res.render('index.hbs', hbsData);
    }
    
}
export default PageRoutes;