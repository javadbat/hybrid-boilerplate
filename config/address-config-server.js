/**
 * @classdesc hybrid boilerplate support both client side app and server side app here you can add your server side urls and address for example you can put docker address here for your servers comunications
 */
class AddressConfig{
    constructor(env){
        this.env = env;
    }
    get serviceUrl(){
        //to config differently in docker. use server direct url here
        switch(this.appStage){
            case 'dev':
                return 'https://devapi.com';
            case 'uat':
                return 'https://uatapi.com';
            case 'release':
                return 'https://releaseapi.com';
            case 'main':
                return 'https://api.com';
        }
        return 'NOT_VALID_ENV';
    }
    get clientServiceUrl(){
        //in server serviceUrl used for server to server connection but we pass this to client for example for html file
        switch(this.appStage){
            case 'dev':
                return 'https://devapi.com';
            case 'uat':
                return 'https://uatapi.com';
            case 'release':
                return 'https://releaseapi.com';
            case 'main':
                return 'https://api.com';
        }
        return 'NOT_VALID_ENV';
    }
}
export default AddressConfig;