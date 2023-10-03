export type AppErrorOptions = {
    show:boolean,
    key?:string,
    isServerError?:boolean,
    detail?:any,
    isValidError?:boolean
}
export class AppError extends Error{
    show:boolean
    date:Date
    key?:string
    isServerError?:boolean
    detail?:any
    isValidError?:boolean
    constructor(message:string, options:AppErrorOptions){
        super(message);
        this.date = new Date();
        this.name=this.getName(options.isValidError);
        this.show = options.show || false;
        // if we want we can add key to error so we can detect repeative error or handle error with special key diffrently
        this.key = options.key || null;
        this.isServerError = options.isServerError || false;
        this.detail = options.detail || null;
        //some error cuased by user action and they are not server error for example 
        this.isValidError = options.isValidError || false;
    }
    getName(isValidError:boolean){
        if(isValidError){
            return "APP_ERROR_VALID";
        }
        return "APP_ERROR";
    }
}