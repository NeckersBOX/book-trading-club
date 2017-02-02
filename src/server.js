import Express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import signupAPI from './api/signup';

const app = new Express ();

app.set ('view engine', 'ejs');
app.set ('views', path.join (__dirname, 'views'));

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({ extended: true }));

app.use (Express.static ('dist'));
app.use (helmet ());

app.use (cookieSession ({
  name: 'BTCSession',
  secret: process.env.secretCookie,
  cookie: {
    httpOnly: true,
    expires: new Date (Date.now () + 6 * 60 * 60 * 1000)
  }
}));

app.post ('/api/signup', signupAPI);

app.get ('*', (req, res) => {
  match ({ routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err)
        return res.status (500).send (err.message);

      if (redirectLocation)
        return res.redirect (302, redirectLocation.pathname + redirectLocation.search);

      let markup;

      if ( renderProps ) {
        markup = renderToString (<RouterContext {...renderProps} />);
      }
      else {
        markup = renderToString (<NotFoundPage />);
        res.status (404);
      }

      return res.render ('index', { markup });
    }
  );
});

app.listen (process.env.PORT || 3000, err => {
  if ( err )
    console.err ('Starting server : Error: ' + err.message);

  console.log ('Server running');
});
