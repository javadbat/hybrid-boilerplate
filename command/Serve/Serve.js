import { ExpressApp } from "./ExpressApp.js";

const expressApp = new ExpressApp();
expressApp.serve();
export default expressApp.app;