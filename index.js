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
    console.log('');
    console.log(`&&&&&&&&&&&&&`)
    console.log('');
    // author create
    const vardenis = await Author.create(conn, 'Vardenis', 'Pavardenis');
    const mike = await Author.create(conn, 'Mike', 'Pukuotukas');
    const paula = await Author.create(conn, 'Paula', 'Paulaviciute');
    const greta = await Author.create(conn, 'Greta', 'Kildisiene');
    console.log(vardenis);
    console.log(mike);
    console.log(paula);
    console.log(greta);

    //
    const authors = await Author.listAll(conn);
    console.log(authors);

    //find by ID
    console.log('');
    const byID = await Author.findById(conn, -2);
    console.log(byID);
    console.log('');
    //findb y firstName
    console.log('');
    const authorName = await Author.findByFirstname(conn, '');
    console.log(authorName);
    console.log('');

    //find by lastname
    console.log('');
    const authorSurname = await Author.findByLastname(conn, 'Pukuotukas');
    console.log(authorSurname);
    console.log('');

    //update author by ID
    console.log('');
    const update = await Author.updatePropertyById(conn, 2, 'firstname', 'Pavardenis')
    console.log(update);
    console.log('');

    //delete author by ID
    console.log('');
    const deleteAuthor = await Author.delete(conn, 1);
    console.log(deleteAuthor);
    console.log('');

    //////////////////////////

    console.log('');
    console.log(`$$$$$$$$$$$$$`)
    console.log('');

    // create book
    const createBook = await Books.create(conn, 2, 'Styven Seagal', '1998-10-27')
    console.log(createBook);

    const createBook2 = await Books.create(conn, 1, 'O trecias geltonas', '1998-12-27')
    console.log(createBook2);

    const createBook3 = await Books.create(conn, 1, 'Vytautas Sustauskas', '1998-12-27')
    console.log(createBook3);

    //create book list
    const listBooks = await Books.listAll(conn);
    console.log(listBooks);

    // find by name

    const searchByName = await Books.findByName(conn, 'geltonas')
    console.log(searchByName);

    // find by date

    const searchByDate = await Books.findByYear(conn, '1998-12-27')
    console.log(searchByDate);

    //update by ID

    const updatedID = await Books.updateById(conn, 4, 'book_name', 'Atvirai')
    console.log(updatedID);

    //update name by ID
    const updatedNameById = await Books.updateNameById(conn, 2, 'Pepe Ilgakojine')
    console.log(updatedNameById);

    // update date by ID
    const updatedDate = await Books.updateYearById(conn, 4, '1992-06-25')
    console.log(updatedDate);


    // delete book
    const deletedBook = await Books.delete(conn, 4);
    console.log(deletedBook);

    // deleted by author ID

    const deletedByAuthorId = await Books.deleteAllByAuthorId(conn, 1);
    console.log(deletedByAuthorId);
}


app.init();

module.exports = app;