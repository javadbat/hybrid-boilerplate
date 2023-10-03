const checkValidity = (input:string) => {
    if (!/^\d{10}$/.test(input)) return false;
    const check = +input[9];
    const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
};

export const lengthValidation = {
    validator: /^.{10}$/g,
    message: 'کد ملی 10 رقم می باشد'
};

export const publicIdValidity = {
    validator: (id:string) => { return checkValidity(id); },
    message: "کد ملی معتبر نمی باشد"
};
export const NationalCodeValidations = [lengthValidation, publicIdValidity];
export const nationalCodeInputValidations = [lengthValidation];