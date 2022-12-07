import { ExpressApp } from "./express-app.js";

const expressApp = new ExpressApp();
expressApp.serve();
export default expressApp.app;