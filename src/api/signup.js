import { MongoClient } from 'mongodb';
import co from 'co';
import { validateSignup } from '../common';
import bcrypt from 'bcrypt';

const signupAPI = (req, res) => {
  res.writeHead (200, { 'Content-Type': 'application/json' });

  const userInfo = Object.assign ({}, req.body, {
    signup_name: req.body.username.trim (),
    username: req.body.username.trim ().toLowerCase (),
    usermail: req.body.usermail.trim ().toLowerCase (),
  });

  const validateResult = validateSignup (userInfo);

  if ( validateResult )
    return res.end (JSON.stringify ({ error: validateResult }));

  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);
    const btc_users = db.collection ('btc_users');

    let doc = yield btc_users.findOne ({
      $or: [
        { name: userInfo.username },
        { email: userInfo.usermail }
      ]
    });

    if ( doc ) {
      const field = (doc.name == userInfo.username) ? 'Username' : 'Email';
      res.end (JSON.stringify ({ error: field + ' already taken.' }));
      db.close ();
      return;
    }

    bcrypt.hash (userInfo.password, 10).then (hash => {
      btc_users.insertOne ({
        name: userInfo.username,
        signup_name: userInfo.signup_name,
        email: userInfo.usermail,
        hash
      });

      res.end (JSON.stringify ({ success: true }));
      db.close ();
    });
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default signupAPI;
