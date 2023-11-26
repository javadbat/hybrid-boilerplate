import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react"
import { NumberSeparator } from "../number-helper";

export const useNumberSeparator = (value:number) => {
    return useMemo(() => {
        if(typeof value == "number"){
            return NumberSeparator(value)
        }else{
            return 0
        }
    }, [value]);
}