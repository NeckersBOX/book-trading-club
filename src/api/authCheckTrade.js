import { MongoClient } from 'mongodb';
import co from 'co';

const authCheckTradeAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);

    let doc = yield db.collection ('btc_trades').findOne ({
      book: +req.body.book_date,
      from_user: req.user.name,
      to_user: req.body.book_user
    });

    db.close ();

    if ( !doc ) {
      res.end (JSON.stringify ({ status: false }));
      return;
    }

    res.end (JSON.stringify ({ status: doc.status == 'pending' }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authCheckTradeAPI;
