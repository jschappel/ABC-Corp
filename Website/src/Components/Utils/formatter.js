const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class DateFormat extends Date {

    constructor(date){
        super(date)
    }

    /**
     * toLongString: Converts a UTC Date into: Month Day, Year
     * Month is fully spelled out.
     * @returns {String} with the formatted date
     */
    toLongString() {
        return `${monthArray[this.getMonth()]} ${this.getDay()}, ${this.getFullYear()}`
    }
}

export default DateFormat