import { ExpressApp } from "./express-app.ts";

const expressApp = new ExpressApp();
expressApp.serve();
export default expressApp.app;