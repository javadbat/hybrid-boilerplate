import AddressConfig from "./address-config";

class GeneralConfig{
    constructor(env,appStage){
        this.env = env;
        //app stage tell which stage our app are in for example if you are in local env or you are in dev or master envirement.
        //curenlty it only use to determine server address but you can write more logic on it for example you can chnage your app log level base on envirement
        this.appStage = appStage;
        this.address = new AddressConfig(this.appStage);
    }
}
const generalConfig = new GeneralConfig(process.env.NODE_ENV,process.env.APP_STAGE);
export default generalConfig;