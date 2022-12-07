function faToEnDigits(input) {
    if (typeof input !== "string"){
        return '';
    }
    const regex = /[۰-۹]/g;
    let result = input.replace(regex, function (w) {
        return String.fromCharCode(w.charCodeAt(0) - 1728);
    }
    );
    return result;
}

function enToFaDigits(input) {
    if (typeof input !== "string" && isNaN(input)){
        return '';
    }
    const regex = /[0-9]/g;
    let result = input.toString().replace(regex, function (w) {
        return String.fromCharCode(w.charCodeAt(0) + 1728);
    }
    );
    return result;
}
export {enToFaDigits};
export {faToEnDigits};