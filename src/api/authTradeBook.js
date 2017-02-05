import { MongoClient } from 'mongodb';
import co from 'co';

const authTradeBookAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);

    let book = yield db.collection ('btc_books').findOne ({
      user: req.body.book_user,
      date: +req.body.book_date
    });

    if ( !book ) {
      db.close ();
      res.end ({ error: 'Book not found.' });
      return;
    }

    let result = yield db.collection ('btc_trades').insertOne ({
      book: +req.body.book_date,
      from_user: req.user.name,
      to_user: req.body.book_user,
      date: Date.now (),
      status: 'pending'
    });

    db.close ();

    res.end (JSON.stringify ({ success: true }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authTradeBookAPI;
