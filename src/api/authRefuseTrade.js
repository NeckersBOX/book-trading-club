import { MongoClient } from 'mongodb';
import co from 'co';

const authRefuseTradeAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);

    let result = db.collection ('btc_trades').findOneAndUpdate ({
      book: +req.body.book_id,
      from_user: req.body.from_user,
      to_user: req.body.to_user
    }, { $set: { status: 'refused' } });

    db.close ();

    res.end (JSON.stringify ({ success: true }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authRefuseTradeAPI;
