import Build from './build-module.js';
import { generalConfigServer } from '../../config/general-config-server.js';
import { ServiceWorkerBuilder } from './service-worker-builder.js';

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = generalConfigServer.env;
}
if(!process.env.APP_STAGE){
    process.env.APP_STAGE = generalConfigServer.appStage;
}

const build = new Build();
build.build(false);

