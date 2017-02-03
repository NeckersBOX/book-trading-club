import { MongoClient } from 'mongodb';
import co from 'co';

const authLoginAPI = (req, res) => {
    co (function *() {
      const db = yield MongoClient.connect (process.env.mongoURI);
      const books = yield db.collection ('btc_books').find ({ user: req.user.name }).toArray ();

      db.close ();

      res.writeHead (200, { 'Content-Type': 'application/json' });
      res.end (JSON.stringify ({
        success: true,
        userInfo: {
          name: req.user.signup_name,
          email: req.user.email,
          city: req.user.city,
          state: req.user.state,
          books
        }
      }));
    }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authLoginAPI;
