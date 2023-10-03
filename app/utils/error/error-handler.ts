import { messageManager } from "../app-message/app-message";
import { AppError } from "./app-error";
class ErrorStack{
    stack:AppError[] = []
    get length(){
        return this.stack.length;
    }
    constructor(){
    }
    add(error:AppError){
        this.stack.push(error);
    }
}
export class ErrorHandler{
    stack:ErrorStack
    constructor(){
        this.stack = new ErrorStack();
    }
    onError(error:AppError){
        this.stack.add(error);
        if(typeof error == "object" && error.show){
            messageManager.newMessage(error.message,"ERROR")
        }
    }
}
