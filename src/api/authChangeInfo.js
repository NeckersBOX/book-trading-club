import { MongoClient } from 'mongodb';
import co from 'co';

const authChangeInfoAPI = (req, res) => {
  co (function *() {
    const db = yield MongoClient.connect (process.env.mongoURI);
    let result = yield db.collection ('btc_users').findOneAndUpdate (req.user, {
      $set: {
        fullname: req.body.fullname.trim (),
        city: req.body.city.trim (),
        state: req.body.state.trim ()
      }
    });

    db.close ();

    res.writeHead (200, { 'Content-Type': 'application/json' });
    res.end (JSON.stringify ({ success: true }));
  }).catch (err => res.end (JSON.stringify ({ error: err.stack })));
};

export default authChangeInfoAPI;
