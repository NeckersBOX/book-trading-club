import { MongoClient } from 'mongodb';
import co from 'co';

const authUserBookAPI = (req, res) => {
  co (function *() {
    res.writeHead (200, { 'Content-Type': 'application/json' });

    const db = yield MongoClient.connect (process.env.mongoURI);

    let books = yield db.collection ('btc_books').find ({
      user: req.user.name
    }).toArray ();

    db.close ();
    res.end (JSON.stringify ({ books }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authUserBookAPI;
