import { JBInputValidationItem } from "jb-input/dist/Types";

export const mobileValidations:JBInputValidationItem[] =  [
    {
        validator:/.+/g,
        message:"لطفا موبایل را وارد کنید"
    },
    {
        validator:/^[0-9]{11}$/g,
        message:"موبایل میبایست 11 رقم باشد"
    },
    {
        validator:/^09[0-9]{9}$/g,
        message:"شماره باید با 09 شروع بشود"
    }
]