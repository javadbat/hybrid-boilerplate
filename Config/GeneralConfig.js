import AddressConfig from "./AddressConfig";

class GeneralConfig{
    constructor(env,appStage){
        this.env = env;
        this.appStage = appStage;
        this.address = new AddressConfig(this.appStage);
    }
}
const generalConfig = new GeneralConfig(process.env.NODE_ENV,process.env.APP_STAGE);
export default generalConfig;