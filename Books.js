/**
 * Kaip rasyti JSDOc'sus?
 * Link: https://jsdoc.app
 */
const Validation = require('./Validations');
const Books = {};



/**
 * Autoriaus isleistos knygos irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} bookName Knygos pavadinimas.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */

Books.create = async (connection, authorId, bookName, bookReleaseYear) => {
    //Validation:
    if (!Validation.isValidID(authorId)) {
        return `$ Author ID has to be positive integer number! $`
    }
    if (!Validation.isValidName(bookName)) {
        return `$ Incorrect author name entry! $`;
    }

    // if (!Validation.isYearValid(bookReleaseYear)) {
    //     return `ERROR: Incorrect date input`
    // }

    const sql = 'INSERT INTO `books`\
                    (`author_id`, `book_name`, `release_year`) \
                VALUES (" '+ authorId + ' ", " ' + bookName + ' ", " ' + bookReleaseYear + ' ")';

    const [rows] = await connection.execute(sql);
    const createBook = `${bookName} written by author who ID is ${authorId}, released in ${bookReleaseYear} was succesfully created!`
    return createBook;
}

/**
 * Visu autoriu isleistu knygu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.listAll = async (connection) => {
    const sql = 'SELECT * FROM `books`';
    const [rows] = await connection.execute(sql);

    let i = 0;
    const booksList = [];
    for (const book of rows) {
        booksList.push(`${++i}. Book:${book.book_name} which was written by author which ID is ${book.author_id}, released in ${book.release_year}.`)
    };

    return booksList

}

/**
 * Knygos paieska pagal autoriaus ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<string>} Tekstas su knygos duomenimis..
 */
Books.findByName = async (connection, bookName) => {
    const sql = 'SELECT * FROM `books` WHERE `book_name` LIKE "%' + bookName + '%"';
    const [rows] = await connection.execute(sql);

    if (!Validation.isValidName(bookName)) {
        return `$ Incorrect book title entry! $`;
    }
    let response = 'Book not found!'

    if (rows.length > 0) {
        const bookTitle = rows.map(obj => obj.book_name);
        response = `Book was found by title '${bookName}': "${bookTitle.join(', ')}".`
    }
    return response;
}
/**
 * Knygos paieska pagal metus.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */
Books.findByYear = async (connection, bookReleaseYear) => {
    const sql = 'SELECT * FROM `books` WHERE `release_year` LIKE "' + bookReleaseYear + '"';
    const [rows] = await connection.execute(sql);

    let response = 'Book not found!'

    if (rows.length > 0) {
        const bookTitle = rows.map(obj => obj.book_name);
        response = `Book was found by date '${bookReleaseYear}': "${bookTitle.join(', ')}". `
    }
    return response;
}
/**
 * Knygos paieska pagal ID ir kita uzduota parametra.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} propertyName Atnaujinamos savybes pavadinimas.
 * @param {string} propertyValue Atnaujinamos savybes verte.
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */

Books.updateById = async (connection, bookId, propertyName, propertyValue) => {

    const props = ['id', 'author_id', 'book_name', 'release_year']; //sarasas
    //Validations:
    if (!props.includes(propertyName)) {
        return 'ERROR, insert correct integer!'
    }
    if (!Validation.isValidID(bookId)) {
        return `$ Book ID has to be positive integer number! $`
    }

    if (!Validation.isValidText(propertyName)) {
        return `$ ERROR: wrong parameter integer $`;
    }

    if (propertyName === 'book_name' && !Validation.isValidText(propertyValue)) {
        return console.error('ERROR: incorrect book title entry')
    }

    const sql = 'UPDATE `books`\
                         SET ' + propertyName + ' = "' + propertyValue + '" \
                         WHERE `books`.`id` = ' + bookId;
    const [rows] = await connection.execute(sql);
    const updated = `Book which ID = ${bookId} property "${propertyName}" has been updated to "${propertyValue}".`
    return updated
}

/**
 * Knygos atnaujinimas pagal pavadinima.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} bookName Atnaujinamos savybes pavadinimas.
 * @returns {Promise<string>} Tekstas su knygos duomenimis.
 */

Books.updateNameById = async (connection, bookId, bookName) => {
    //Validations:
    if (!Validation.isValidID(bookId)) {
        return `$ Book ID has to be positive integer number! $`
    }

    if (!Validation.isValidName(bookName)) {
        return `$ Incorrect book title entry! $`;
    }

    const sql = 'UPDATE `books` \
                        SET `book_name` = "'+ bookName + '" \
                        WHERE `books`.`id` =' + bookId;
    const [rows] = await connection.execute(sql);
    const updated = `Book which ID = ${bookId} has new title updated to "${bookName}".`;
    return updated
}

/**
 * Knygos isleidimo metu atnaujinimas.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {number} bookReleaseYear Nauji knygos metai.
 * @returns {Promise<Object[]>} Grazina pranesima apie atlikta operacija.
 */
Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
    //Validations:

    if (!Validation.isValidID(bookId)) {
        return `$ Book ID has to be positive integer number! $`
    }

    const sql = 'UPDATE `books` \
                        SET `release_year` = "'+ bookReleaseYear + '" \
                        WHERE `books`.`id` =' + bookId;
    const [rows] = await connection.execute(sql);
    const updated = `Book which ID = ${bookId} has new release date updated to "${bookReleaseYear}".`;
    return updated

}
/**
 * Pasaliname knyga is lenteles pagal duota ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @returns {Promise<Object[]>} Grazina pranesima apie atlikta operacija.
 */
Books.delete = async (connection, bookId) => {
    //Validation:

    if (!Validation.isValidID(bookId)) {
        return `$ Book ID has to be positive integer number! $`
    }
    const sql = 'DELETE FROM `books`\
                        WHERE `books`.`id` = ' + bookId;
    const [rows] = await connection.execute(sql);
    const deleted = `Book which ID = ${bookId} has been deleted from list.`
    return deleted;
}

/**
   * Pasaliname knyga is lenteles pagal duota autoriaus ID.
   * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
   * @param {number} authorId Autoriaus ID.
   * @returns {Promise<Object[]>} Grazina pranesima apie atlikta operacija.
   */
Books.deleteAllByAuthorId = async (connection, authorId) => {
    //Validation:
    if (!Validation.isValidID(authorId)) {
        return `$ Book ID has to be positive integer number! $`
    }

    const sql = 'DELETE FROM `books`\
                        WHERE `author_id` = ' + authorId;
    const [rows] = await connection.execute(sql);

    const deletedAuthorID = `Book which author ID = ${authorId} has been deleted from list.`
    return deletedAuthorID;

}

module.exports = Books;