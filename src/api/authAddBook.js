import googleBooks from 'google-books-search';
import { MongoClient } from 'mongodb';
import co from 'co';

const searchOptions = {
    key: process.env.booksAPI,
    field: 'title',
    offset: 0,
    limit: 20,
    type: 'books',
    order: 'newest',
    lang: 'en'
};

const authAddBookAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  if ( req.body.bookname.trim ().length < 1 ) {
    res.end (JSON.stringify ({ error: 'At least 1 character for the book name' }));
    return;
  }

  googleBooks.search (req.body.bookname.trim (), searchOptions, (error, results, apiResponse) => {
    if ( error ) {
      res.end (JSON.stringify ({ error }));
      return;
    }

    let book = null
    for ( let bookId in results ) {
      if ( results[bookId].thumbnail && results[bookId].thumbnail.length ) {
        book = results[bookId];
        break;
      }
    }

    if ( !book ) {
      res.end (JSON.stringify ({ error: 'Book not found.' }));
      return;
    }

    co (function *() {
      const db = yield MongoClient.connect (process.env.mongoURI);
      const bookDoc = {
        user: req.user.name,
        date: Date.now (),
        book
      };

      let result = yield db.collection ('btc_books').insertOne (bookDoc);

      db.close ();

      res.end (JSON.stringify (bookDoc));
    }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
  });
};

export default authAddBookAPI;
