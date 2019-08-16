// This file contains random helper functions

/**
 * phoneNumberFormatter: format's a phone number from XXXXXXXXXX to XXX-XXX-XXXX
 * @param {String} number the phone number to formate
 * @returns {String} the formatted number. If the number format can not ber determined the origional number is returned.
 */
function phoneNumberFormatter(number) {

    const numLength = number.length

    //Check if the number is already formatted
    if(number.includes('-')) return number

    // Standard American length
    if(numLength === 10) return number.substring(0,3) + "-" + number.substring(3,6) + "-" + number.substring(6)
    // number with a country code
    else if (numLength > 10) {
        const extraDigits = numLength - 10
        return number.substring(0, extraDigits + 1) + "-" + number.substring(extraDigits + 1, extraDigits + 3) + "-" + number.substring(extraDigits + 3, extraDigits + 6) + "-" + number.substring(extraDigits + 6)
    }
    // short hand american number
    else if (numLength === 7) return number.substring(0,3) + "-" + number.substring(3)

    // Not sure of the format so just return the original number
    else return number
}

module.exports = {
    phoneNumberFormatter
}