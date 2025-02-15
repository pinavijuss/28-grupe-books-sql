const mysql = require('mysql2/promise');

const db = {}

db.init = async ({ database, host, user }) => {
    const connection = await db.createDatabase({ database, host, user });

    await db.createTableAuthor(connection);
    await db.createTableBooks(connection);

    return connection;
}

db.createDatabase = async ({ database, host, user }) => {
    host = host ? host : 'localhost';
    user = user ? user : 'root';

    try {
        let db = await mysql.createConnection({ host, user });
        await db.execute(`DROP DATABASE IF EXISTS \`${database}\``);
        console.log('Buvusi duombaze istrinta');
    } catch (error) {
        console.log('Nera duombazes, kuria butu galima istrinti');
    }

    try {
        let db = await mysql.createConnection({ host, user });
        await db.execute(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
        await db.end();

        db = await mysql.createConnection({ host, user, database });
        console.log('Nauja duombaze sukurta');
        return db;
    } catch (error) {
        return error;
    }
}

db.createTableAuthor = async (connection) => {
    try {
        const sql = 'CREATE TABLE IF NOT EXISTS `authors` (\
                        `id` int(10) NOT NULL AUTO_INCREMENT,\
                        `firstname` char(20) COLLATE utf8_swedish_ci NOT NULL,\
                        `lastname` char(20) COLLATE utf8_swedish_ci NOT NULL,\
                        PRIMARY KEY(`id`)\
                    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_swedish_ci';
        await connection.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti autoriu lenteles');
        console.log(error);
        return error;
    }
}

db.createTableBooks = async (connection) => {
    try {
        const sql = 'CREATE TABLE IF NOT EXISTS `books` (\
                        `id` int(10) NOT NULL AUTO_INCREMENT,\
                        `author_id` int(10) NOT NULL,\
                        `book_name` char(50) COLLATE utf8_swedish_ci NOT NULL,\
                          `release_year` date NOT NULL DEFAULT \'1998-11-25\',\
                    PRIMARY KEY(`id`) \
                    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_swedish_ci';
        await connection.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti knygu lenteles');
        console.log(error);
        return error;
    }
}

module.exports = db;