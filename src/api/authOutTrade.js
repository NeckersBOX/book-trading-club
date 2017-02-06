import { MongoClient } from 'mongodb';
import co from 'co';

const authOutTradeAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);
    const btc_books = db.collection ('btc_books');

    const outTrades = yield db.collection ('btc_trades').find ({
      to_user: req.user.name
    }).toArray ();

    let results = [];
    for ( let id in outTrades ) {
      let book = yield btc_books.findOne ({
        date: +outTrades[id].book,
        user: outTrades[id].to_user
      });

      if ( !book ) continue;

      results.push (Object.assign ({}, outTrades[id], { book_id: +outTrades[id].book, book }));
    }

    db.close ();

    res.end (JSON.stringify ({ results }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authOutTradeAPI;
