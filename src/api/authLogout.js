import { MongoClient } from 'mongodb';
import co from 'co';

const authLogoutAPI = (req, res) => {
  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);
    let result = yield db.collection ('btc_users').findOneAndUpdate (req.user, {
      $set: {
        session: undefined
      }
    });

    req.session = null;

    res.writeHead (200, { 'Content-Type': 'application/json' });
    res.end (JSON.stringify ({ success: true }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authLogoutAPI;
