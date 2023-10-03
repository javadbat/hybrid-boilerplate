import { useCallback } from "react";
//TODO: add interface to cjheck for triggerInputValidation method existance
//TODO: add state that allways keep form validity in itself (need onchange event)
export const useCheckValidations = (refList: React.RefObject<any>[]) => {
    const checker = useCallback((): boolean => {
        const isAnyError = refList.some((ref): boolean => {
            const result = ref.current?.triggerInputValidation(true);
            return !result?.isAllValid
        })
        return isAnyError;
    }, refList);
    return [checker]
} 