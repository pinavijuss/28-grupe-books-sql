const db = require('./db');
const Author = require('./Author');
const Books = require('./Books');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'books',
    });

    // author create
    const vardenis = await Author.create(conn, 'Vardenis', 'Pavardenis');
    const mike = await Author.create(conn, 'Mike', 'Pukuotukas');
    const paula = await Author.create(conn, 'Paula', 'Paulaviciute');
    console.log(vardenis);
    console.log(mike);
    console.log(paula);

    //
    const authors = await Author.listAll(conn);
    console.log(authors);

    //find by ID
    const byID = await Author.findById(conn, 2);
    console.log(byID);

    //findb y firstName
    const authorName = await Author.findByFirstname(conn, 'Paula');
    console.log(authorName);

    //find by lastname
    const authorSurname = await Author.findByLastname(conn, 'Pukuotukas');
    console.log(authorSurname);

    //update author by ID
    const update = await Author.updatePropertyById(conn, 2, 'firstname', 'Pavardenis')
    console.log(update);

    //delete author by ID
    const deleteAuthor = await Author.delete(conn, 1);
    console.log(deleteAuthor);
}




app.init();

module.exports = app;