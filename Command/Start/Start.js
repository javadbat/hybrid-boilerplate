import Build from '../Build/BuildModule.js';
import app from '../Serve/Serve.js';

let build = new Build(app);
build.build(true);