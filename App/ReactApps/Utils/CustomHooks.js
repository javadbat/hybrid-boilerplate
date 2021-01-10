import { useEffect } from "react";

export function useEvent(dom, event, handler, passive = false) {
    useEffect(() => {
        if (dom) {
            // initiate the event handler
            dom.addEventListener(event, handler, passive);
        }
        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            if(dom){
                dom.removeEventListener(event, handler);
            }
        };
    });
}