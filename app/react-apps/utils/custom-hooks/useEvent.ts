import { useEffect } from "react";
let counter = 0;
export function useEvent(dom:HTMLElement, event:string, handler:(e:any)=>any, passive = false) {
    useEffect(() => {
        if (dom) {
            // initiate the event handler
            dom.addEventListener(event, handler, passive); 
            if(event == 'scrollEnd'){
                console.log("add",++counter);
            }
        }
        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            if(dom){
                if(event == 'scrollEnd'){
                    console.log("clean",counter)
                }
                dom.removeEventListener(event, handler,passive);
            }
        };
    });
}