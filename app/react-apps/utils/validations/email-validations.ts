export const validity = {
    validator: /^$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/,
    message:"ایمیل معتبر نمی باشد"
};
export const lengthValidation = {
    validator:/[a-zA-Z]/,
    message:"ایمیل خود را وارد نمایید."

};

export const emailValidations = [validity,lengthValidation];