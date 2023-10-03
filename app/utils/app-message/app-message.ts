import 'jb-notification';
import 'jb-notification/dist/wrapper/jb-notification-wrapper';
import { JBNotificationWebComponent, NotificationType } from 'jb-notification';
// new messaging system
class MessageManager{
    get wrapperDom():HTMLDivElement{
        return document.querySelector('jb-notification-wrapper')! as HTMLDivElement
    }
    constructor(){
        this.#initWrapperDom();
    }
    #initWrapperDom(){
        const notificationWrapper:Element = document.createElement('jb-notification-wrapper');
        document.body.appendChild(notificationWrapper);

    }
    #createMessageDom(title:string,type:NotificationType,desc:string|null){
        const notif:JBNotificationWebComponent = document.createElement('jb-notification')as JBNotificationWebComponent;
        notif.type =type;
        notif.title = title;
        notif.description = desc;
        notif.addEventListener("close",this.onNotifClose.bind(this))
        return notif;
    }
    newMessage(title:string,type:NotificationType,desc:string|null = null){
            const dom = this.#createMessageDom(title,type,desc);
            //TODO: change it to new web component wrapper with managerial ability
            this.wrapperDom?.appendChild(dom);
            dom.show();
    }
    onNotifClose(e:Event){
        this.wrapperDom.removeChild(e.target! as Node);
    }
}
export const messageManager = new MessageManager();