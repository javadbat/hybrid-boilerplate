export const lengthValidation = {
    validator: /^.{3,50}$/g,
    message: 'نام حداقل باید 3 کاکتر و حداکثر 50 کاراکتر طول داشته باشد'
};
export const PersianValidation = {
    validator:/^[\u0600-\u06FF\s]+$/,
    message:'نام حتما باید فارسی باشد'
};

export const nameValidations = [lengthValidation,PersianValidation];
export const familyLengthValidation = {
    validator: /^.{3,50}$/g,
    message: 'نام خانوادگی حداقل باید 3 کاکتر و حداکثر 50 کاراکتر طول داشته باشد'
};
export const familyPersianValidation = {
    validator:/^[\u0600-\u06FF\s]+$/,
    message:'نام خانوادگی حتما باید فارسی باشد'
};
export const familyValidations = [familyLengthValidation,familyPersianValidation];