import { MongoClient } from 'mongodb';
import co from 'co';

const authRemoveBookAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);

    let result = yield db.collection ('btc_books').findOneAndDelete ({
      date: +req.body.book_id,
      user: req.user.name
    });
  
    db.close ();

    res.end (JSON.stringify ({ success: true }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authRemoveBookAPI;
