/**
 * @classdesc base address of external resources will gather here and will be accessed base on a defined APP_STAGE envirement variable. you can add your server custom address here
 * if your addresses are not depend of app envirement you could add static get method
 */
class AddressConfig{
    constructor(appStage){
        this.appStage = appStage;
    }
    get serviceUrl(){
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