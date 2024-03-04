import { useState, useEffect, useRef, RefObject } from "react";

// check if user clicks outside of a component to hide it
export const useHandleClickOutside = (initialIsVisible:boolean, shouldCloseOnSelection = false) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLElement>(null);

    const handleClickOutside = (event:MouseEvent) => {
        const target  = event.target as HTMLElement;
        if (ref.current && (!ref.current.contains(target) || shouldCloseOnSelection)) {
            setTimeout(() => {
                if (ref?.current) setIsComponentVisible(false);
            }, 0);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
};
// check if user clicks outside of a component to hide it
export const useClickOutside = (ref:RefObject<HTMLElement>, onClickOutside:()=>void, exceptions:RefObject<HTMLElement>[]) => {

    const handleClickOutside = (event:MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            let isExceptionContains = false;
            exceptions.forEach((ex)=>{
                if(ex.current?.contains(event.target as Node)){
                    isExceptionContains = true;
                }
            })
            setTimeout(() => {
                if (ref?.current && !isExceptionContains){
                    onClickOutside();
                }
            }, 0);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [ref,exceptions]);
};
