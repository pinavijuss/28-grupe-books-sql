class Validation {

    static isValidName(name) {
        if (name === undefined ||
            typeof name !== 'string' ||
            name.length < 2) {
            return false;
        }
        return true;
    }

    static isValidFirstName(firstname) {
        return Validation.isValidName(firstname);
    }

    static isValidLastName(lastname) {
        return Validation.isValidName(lastname);
    }

    static isValidID = (id) => {

        if (typeof id !== 'number' ||
            id < 1 ||
            id % 1 !== 0) {
            return false;
        }
        return true;
    }

    static isValidText = (text) => {
        const abc = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM'
        for (const letter of text) {
            if (!abc.includes(letter)) {
                return false;
            }
            return true;
        }
    }

    // static isYearValid = (param) => {

    // }
}

module.exports = Validation;

