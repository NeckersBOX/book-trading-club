import { MongoClient } from 'mongodb';
import co from 'co';
import { validateLogin } from '../common';
import bcrypt from 'bcrypt';

const loginAPI = (req, res) => {
  let validateResult = validateLogin (req.body);

  if ( validateResult ) {
    res.writeHead (200, { 'Content-Type': 'application/json' });
    res.end (JSON.stringify ({ error: validateResult }));
    return;
  }

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);
    const btc_users = db.collection ('btc_users');

    let doc = yield btc_users.findOne ({
        name: req.body.username.trim ().toLowerCase ()
    });

    if ( !doc ) {
      res.writeHead (200, { 'Content-Type': 'application/json' });
      res.end (JSON.stringify ({ error: 'Username not valid.' }));
      db.close ();
      return;
    }

    validateResult = yield bcrypt.compare (req.body.password, doc.hash);
    if ( !validateResult ) {
      res.writeHead (200, { 'Content-Type': 'application/json' });
      res.end (JSON.stringify ({ error: 'Password not valid.' }));
      db.close ();
      return;
    }

    const books = yield db.collection ('btc_books').find ({ user: doc.name }).toArray ();
    const session = yield bcrypt.hash (Date.now () + doc.email, 10);

    btc_users.findOneAndUpdate (doc, { $set: { session } });

    req.session.hash = session;
    req.session.save ();

    res.end (JSON.stringify ({
      success: true,
      userInfo: {
        fullname: doc.fullname,
        name: doc.signup_name,
        email: doc.email,
        city: doc.city,
        state: doc.state,
        books
      }
    }));

    db.close ();
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default loginAPI;
