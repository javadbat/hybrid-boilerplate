import { message } from "../AppMessage/AppMessage";
class ErrorStack{
    get length(){
        return this.stack.length;
    }
    constructor(){
        this.stack = [];
    }
    add(error){
        this.stack.push(error);
    }
}
export class ErrorHandler{
    constructor(){
        this.stack = new ErrorStack();
    }
    onError(error){
        this.stack.add(error);
        if(typeof error == "object" && error.show){
            message.show({message:error.message , type:'error'});
        }
    }
}
