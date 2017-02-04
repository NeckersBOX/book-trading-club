import googleBooks from 'google-books-search';

const searchOptions = {
    key: process.env.booksAPI,
    field: 'title',
    offset: 0,
    limit: 1,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};

const authSearchBookAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  if ( req.body.bookname.trim ().length < 1 ) {
    res.end (JSON.stringify ({ error: 'At least 1 character for the book name' }));
    return;
  }

  googleBooks.search (req.body.bookname.trim (), searchOptions, (error, results, apiResponse) => {
    if ( err ) {
      res.end (JSON.stringify ({ error }));
      return;
    }

    res.end (JSON.stringify ({ book: results[0] }));
  });
};

export default authSearchBookAPI;
