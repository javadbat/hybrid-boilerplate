export class AppError extends Error{
    constructor(message, {show= false, key=null, isServerError = false, detail= null, isValidError= false}){
        super(message);
        this.date = new Date();
        this.name=this.getName(isValidError);
        this.show = show;
        // if we want we can add key to error so we can detect repeative error or handle error with special key diffrently
        this.key = key;
        this.isServerError = isServerError;
        this.detail = detail;
        //some error cuased by user action and they are not server error for example 
        this.isValidError = isValidError;
    }
    getName(isValidError){
        if(isValidError){
            return "APP_ERROR_VALID";
        }
        return "APP_ERROR";
    }
}