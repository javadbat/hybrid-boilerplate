import { ServerAddress } from "./server-address.ts";
import { AppStage, NodeEnv } from "./types.ts";

class ServerConfig{
    env = {
        nodeEnv:(Deno.env.get('NODE_ENV') || 'development') as NodeEnv,
        appStage:(Deno.env.get('APP_STAGE') || 'dev') as AppStage,
    }
    basePath = Deno.cwd();
    host ="0.0.0.0";
    port= Number(Deno.env.get('PORT')|| 3000);
    address:ServerAddress
    constructor(){
        this.address = new ServerAddress(this.env.appStage,this.port);
    }
}

export const serverConfig = new ServerConfig();
