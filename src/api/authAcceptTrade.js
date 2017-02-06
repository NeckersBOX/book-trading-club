import { MongoClient } from 'mongodb';
import co from 'co';

const authAcceptTradeAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);

    let result = db.collection ('btc_books').findOneAndUpdate ({
      date: +req.body.book_id,
      user: req.body.to_user
    }, {
      $set: {
        date: Date.now (),
        user: req.body.from_user
      }
    });

    result = db.collection ('btc_trades').findOneAndDelete ({
      book: +req.body.book_id,
      from_user: req.body.from_user,
      to_user: req.body.to_user
    });

    db.close ();

    res.end (JSON.stringify ({ success: true }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authAcceptTradeAPI;
