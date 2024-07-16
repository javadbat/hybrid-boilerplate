import { AppStage } from "./types.ts";

export class ServerAddress {
    #appStage:AppStage;
    #port:number;
    constructor(appStage:AppStage,port:number){
        this.#appStage = appStage;
        this.#port = port;
    }
    get localAddress(){
        return `http://localhost:${this.#port}`
    }
    get siteUrl(){
        switch (this.#appStage){
            case 'dev':
                return `http://localhost:${this.#port}`;
            case 'test':
                return `https://localhost:${this.#port}`;
            case 'main':
                return `http://localhost:${this.#port}`;
        }
        return 'WRONG_APP_STAGE'
    }
    get serviceUrl(){
      switch (this.#appStage){
          case 'dev':
              return `https://devapi.com`;
          case 'test':
              return `https://testapi.com`;
          case 'main':
              return `http://localhost:${this.#port}`;
      }
      return 'WRONG_APP_STAGE'
  }
}