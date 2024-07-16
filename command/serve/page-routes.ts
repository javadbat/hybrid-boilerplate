import path from 'node:path';
import exphbs from 'npm:express-handlebars';
import ReactAppController from '../../server/controllers/react-app-controller.ts';
import { buildConfig } from '@config/build-config.ts';
import { serverConfig } from "@config/server-config.ts";
import denoConfig from "../../deno.json" with { type: "json" };

class PageRoutes {
    app:any
    appPath = 'app'
    viewsDirectory = 'views';
    viewsPath = path.join(serverConfig.basePath, this.appPath, this.viewsDirectory)
    constructor(app:any) {
        this.app = app;
        this.appPath = 'app';
    }
    init() {
        //read express.Router() doc for dynamic and more complex route
        //read req.is to specify diffrent resualt for different request type
        //set handlebar template engine
        this.app.set('views', this.viewsPath);
        const hbs = exphbs.create({
            extname: '.hbs',
            helpers: this.getHandlebarHelpers(),
            layoutsDir: 'Layouts',
            defaultLayout: false,
            //helpers      : 'path/to/helpers/directory',
            partialsDir: path.join(this.viewsPath, 'partials')
        });
        this.app.engine('.hbs', hbs.engine);
        this.app.set('view engine', '.hbs');
        // end of handlebar template engine setup
        this.registerRoutes();
    }
    getHandlebarHelpers(){ 
        const helpers = {
            // TODO: impl real helper like date convertor
            isEqual: function (arg1:any, arg2:any, options:any) {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            }
        }
        return helpers;
    }
    registersReactAppsRoutes(){
        //setup controllers
        buildConfig.reactApps.appList.forEach((app)=>{
            const appController = new ReactAppController(app.viewFolderName);
            this.app.use(`/${app.urlPrefix}`,appController.router);
        })
    }
    registerRoutes() {
        this.app.get('/', this.indexPage.bind(this));
        this.registersReactAppsRoutes();
        // here you can add your own custom page routes they may be a html page route or react app page route
    }
    indexPage(req:any, res:any) {
        const hbsData = {
            version: denoConfig.version,
            buildEnv:serverConfig.env.nodeEnv,
            appStage:serverConfig.env.appStage
        };
        res.render('index.hbs', hbsData);
    }
    
}
export default PageRoutes;