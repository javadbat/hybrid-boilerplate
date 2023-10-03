import { useEffect } from "react";

/**
 * set browser title
 * @param {string} title 
 */
export const usePageTitle = title => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};