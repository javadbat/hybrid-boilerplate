import AddressConfig from"./AddressConfigServer.js";
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
class GeneralConfig{
    constructor(){
        this.env = process.env.NODE_ENV?process.env.NODE_ENV:'development';
        // our app have stages from develop to production in realease process and determine which server we send request to
        this.appStage = process.env.APP_STAGE?process.env.APP_STAGE:'dev';
        const __dirname = dirname(fileURLToPath(import.meta.url));
        this.basePath = path.join(__dirname,'../');
        this.host = '0.0.0.0';
        this.port = 3000;
        this.address = new AddressConfig(this.env);
    }
}
const generalConfig = new GeneralConfig();
export default generalConfig;