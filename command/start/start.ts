// import Build from '../build/build-module.js';
// import { ExpressApp } from '../serve/express-app.js';
// const expressApp = new ExpressApp();
// expressApp.serve();
// let build = new Build(expressApp.app);
// build.build(true);
import {ExpressApp} from '../serve/express-app.ts';
const app = new ExpressApp();
app.serve();