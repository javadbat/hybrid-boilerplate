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