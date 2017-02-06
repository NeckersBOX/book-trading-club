import { MongoClient } from 'mongodb';
import co from 'co';

const authInTradeAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);
    const btc_books = db.collection ('btc_books');

    const inTrades = yield db.collection ('btc_trades').find ({
      from_user: req.user.name
    }).toArray ();

    let results = [];
    for ( let id in inTrades ) {
      let book = yield btc_books.findOne ({
        date: +inTrades[id].book,
        user: inTrades[id].to_user
      });

      if ( !book ) continue;

      results.push (Object.assign ({}, inTrades[id], { book_id: +inTrades[id].book, book }));
    }

    db.close ();

    res.end (JSON.stringify ({ results }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authInTradeAPI;
