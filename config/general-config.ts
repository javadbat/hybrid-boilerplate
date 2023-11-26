import AddressConfig from "./address-config";

export type NodeEnv = "production" | "development"

export type AppStage = "dev" | "test" | "release" | "main"
class GeneralConfig{
    env: NodeEnv;
    appStage: AppStage;
    address:AddressConfig;
    constructor(env:NodeEnv,appStage:AppStage){
        this.env = env;
        //app stage tell which stage our app are in for example if you are in local env or you are in dev or master envirement.
        //curenlty it only use to determine server address but you can write more logic on it for example you can chnage your app log level base on envirement
        this.appStage = appStage;
        this.address = new AddressConfig(this.appStage);
    }
}
const generalConfig = new GeneralConfig(process.env.NODE_ENV as NodeEnv,process.env.APP_STAGE as AppStage);
export default generalConfig;