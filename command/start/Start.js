import Build from '../Build/BuildModule.js';
import { ExpressApp } from '../Serve/ExpressApp.js';
const expressApp = new ExpressApp();
expressApp.serve();
let build = new Build(expressApp.app);
build.build(true);