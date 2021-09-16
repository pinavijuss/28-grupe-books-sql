const Author = {};

/**
 * Autoriaus irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius buvo irasytas i duombaze.
 */
Author.create = async (connection, authorFirstname, authorLastname) => {
    const sql = 'INSERT INTO `authors`\
                    (`id`, `firstname`, `lastname`) \
                VALUES (NULL, " '+ authorFirstname + ' ", " ' + authorLastname + ' ")';
    const [rows] = await connection.execute(sql);
    const response = `${authorFirstname} ${authorLastname} was succesfully created!`
    return response;
}

/**
 * Visu autoriu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas nurodantis autoriu sarasa.
 */
Author.listAll = async (connection) => {
    const sql = 'SELECT * FROM `authors`';
    const [rows] = await connection.execute(sql);

    let i = 0;
    const list = [];
    for (let { firstname, lastname } of rows) {
        list.push(`${++i}. ${firstname}${lastname}.`)
    };
    const authorsList = 'Authors list:\n';

    return authorsList + list.join('\n');
}

/**
 * Autoriaus paieska pagal ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @returns {Promise<Object[]>} Grazina autoriaus varda ir pavarde pagal ieskoma varda.
 */
Author.findById = async (connection, authorId) => {
    const sql = 'SELECT * FROM `authors` WHERE `authors`.`id` = ' + authorId;
    const [rows] = await connection.execute(sql);
    if (rows.length === 0) {
        return 'ERROR: ID not found'
    }
    return `Author, who ID = ${authorId} is ${rows[0].firstname} ${rows[0].lastname}`;
}

/**
 * Autoriaus paieska pagal varda.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @returns {Promise<Object[]>} Grazina autoriaus varda ir pavarde pagal ieskoma varda.
 */
Author.findByFirstname = async (connection, authorFirstname) => {
    const sql = 'SELECT * FROM `authors` WHERE `firstname` LIKE "%' + authorFirstname + '%"';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Author not found!';
    } else {
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return `Your searched author by name is ${author}`;
    }
}

/**
 * Autoriaus paieska pagal pavarde.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns {Promise<string>} Tekstas nurodo autoriaus duomenis.
 */
Author.findByLastname = async (connection, authorLastname) => {
    const sql = 'SELECT * FROM `authors` WHERE `lastname` LIKE "%' + authorLastname + '%"';
    const [rows] = await connection.execute(sql);
    if (rows.length === 0) {
        return 'Author not found!';
    } else {
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return `Your searched author by surname is ${author}`;
    }
}

/**
 * Autoriaus paieska pagal id ir viena papildoma parametra.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} propertyName Atnaujinamos savybes pavadinimas.
 * @param {string} propertyValue Atnaujinamos savybes verte.
 * @returns { Promise < string >} Tekstas, skelbiantis kokia savybe, pagal duota ID, buvo atnaujinta i kokia verte.
 */
Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    sql = 'UPDATE authors SET ' + propertyName + ' = "' + propertyValue + '" WHERE `authors`.`id` = ' + authorId;
    [rows] = await connection.execute(sql);
    const updated = `Author whose ID = ${authorId} property ${propertyName} has been updated to ${propertyValue}`
    return updated
}

/**
 * Autoriaus pasalinimas is sistemos pagal duota ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<Object[]>} Grazina pranesima apie atlikta operacija.
 */
Author.delete = async (connection, authorId) => {
    sql = 'DELETE FROM `authors` WHERE `authors`.`id` = ' + authorId;
    [rows] = await connection.execute(sql);
    return `This author, who ID = ${authorId} has been deleted from list.`;
}

module.exports = Author;