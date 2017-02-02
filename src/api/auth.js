import { MongoClient } from 'mongodb';
import co from 'co';
import authAPIList from './authAPI';

const authAPI = (req, res, next) => {
  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);
    const btc_users = db.collection ('btc_users');

    let doc = yield btc_users.findOne ({
      session: req.session.hash
    });

    db.close ();

    if ( !doc ) {
      res.writeHead (200, { 'Content-Type': 'application/json' });
      res.end (JSON.stringify ({ error: 'User not authenticated' }));
      return;
    }

    if ( req.params.api == 'check' ) {
      res.writeHead (200, { 'Content-Type': 'application/json' });
      res.end (JSON.stringify ({ success: true }));
      return;
    }

    if ( authAPIList.indexOf (req.params.api) == -1 ) {
      res.writeHead (404, { 'Content-Type': 'application/json' });
      res.end (JSON.stringify ({ error: req.params.api + ' API doesn\'t exists' }));
      return;
    }

    next ();
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authAPI;
