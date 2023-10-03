import { MutableRefObject, useRef } from "react";

type InitFunc<T> = ()=>T
export const useLazyRef = <T>(initValFunc:InitFunc<T>) => {
    const ref:MutableRefObject<any> = useRef(null);
    if (ref.current === null) {
        ref.current = initValFunc();
    }
    return ref;
};

// used by: useMobx