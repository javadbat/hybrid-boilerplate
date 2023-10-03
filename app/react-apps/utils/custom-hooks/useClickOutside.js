import { useState, useEffect, useRef } from "react";

// check if user clicks outside of a component to hide it
export const useClickOutside = (initialIsVisible, shouldCloseOnSelection = false) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && (!ref.current.contains(event.target) || shouldCloseOnSelection)) {
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
