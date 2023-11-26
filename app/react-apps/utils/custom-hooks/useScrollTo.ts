import { useEffect } from "react";

/**
 * scrolls to the desired coordinates or can scroll to "top" with smooth behavior
 * @param {"top" | number} x horizontal coordinate (or "top")
 * @param {number} y vertical coordinate
 * @param {any} deps dependency array for useEffect
 */
export const useScrollTo = (x: "top" | number, y:number | null, deps:any[] = []) => {
    useEffect(() => {
        if (x === "top") window.scrollTo({ top: 0, behavior: "smooth" });
        else if(typeof y =="number" && typeof x == "number" ){
             window.scrollTo(x, y)
        }
    }, deps);
};
