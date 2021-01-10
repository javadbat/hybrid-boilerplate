import Build from './BuildModule.js';
import generalConfig from '../../Config/GeneralConfigServer.js';
if(!process.env.NODE_ENV){
    process.env.NODE_ENV = generalConfig.env;
}
if(!process.env.APP_STAGE){
    process.env.APP_STAGE = generalConfig.appStage;
}

let build = new Build();
build.build(false);