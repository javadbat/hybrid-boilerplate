import { useEffect } from "react";

/**
 * @description set browser title
 */
export const usePageTitle = (title:string) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};