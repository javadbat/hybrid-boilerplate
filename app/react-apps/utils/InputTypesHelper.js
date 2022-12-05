import { faToEnDigits } from "./PersianHelper";

/**
 * convert 09122244859 to 9190740819 to send to backend
 * @param {string} phoneNumber - The title of the book.
 * @return {string}
 */
export const standardPhoneNumber = function (phoneNumber) {
    const standardPN = faToEnDigits(phoneNumber);
    const phoneNumberRegex = /^(?:0?)([0-9]{10})$/g;
    const result = phoneNumberRegex.exec(standardPN);
    return result[1];
};
