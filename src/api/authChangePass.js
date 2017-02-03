import { MongoClient } from 'mongodb';
import co from 'co';
import bcrypt from 'bcrypt';
import { validatePassword } from '../common';

const authChangePassAPI = (req, res) => {
  let validateResult = validatePassword (req.body.new_password, req.body.new_password);

  if ( validateResult ) {
    res.writeHead (200, { 'Content-Type': 'application/json' });
    res.end (JSON.stringify ({ error: validateResult }));
    return;
  }

  co (function *() {
    validateResult = yield bcrypt.compare (req.body.old_password, req.user.hash);
    if ( !validateResult ) {
      res.writeHead (200, { 'Content-Type': 'application/json' });
      res.end (JSON.stringify ({ error: 'Password not valid.' }));
      db.close ();
      return;
    }

    const db = yield MongoClient.connect (process.env.mongoURI);
    let newHash = yield bcrypt.hash (req.body.new_password, 10);

    let result = yield db.collection ('btc_users').findOneAndUpdate (req.user, {
      $set: { hash: newHash }
    });

    db.close ();

    res.writeHead (200, { 'Content-Type': 'application/json' });
    res.end (JSON.stringify ({ success: true }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authChangePassAPI;
