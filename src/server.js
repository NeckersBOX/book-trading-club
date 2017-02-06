import Express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

import authAPI, { authCheckAPI } from './api/auth';
import signupAPI                 from './api/signup';
import loginAPI                  from './api/login';
import authLoginAPI              from './api/authLogin';
import authLogoutAPI             from './api/authLogout';
import authChangeInfoAPI         from './api/authChangeInfo';
import authChangePassAPI         from './api/authChangePass';
import authAddBookAPI            from './api/authAddBook';
import authRemoveBookAPI         from './api/authRemoveBook';
import authAllBookAPI            from './api/authAllBook';
import authTradeBookAPI          from './api/authTradeBook';
import authCheckTradeAPI         from './api/authCheckTrade';
import authInTradeAPI            from './api/authInTrade';
import authOutTradeAPI           from './api/authOutTrade';
import authRemoveTradeAPI        from './api/authRemoveTrade';
import authRefuseTradeAPI        from './api/authRefuseTrade';
import authAcceptTradeAPI        from './api/authAcceptTrade';

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
app.post ('/api/login', loginAPI);
app.post ('/api/auth/:api', authAPI);
app.post ('/api/auth/check', authCheckAPI);
app.post ('/api/auth/login', authLoginAPI);
app.post ('/api/auth/logout', authLogoutAPI);
app.post ('/api/auth/change-info', authChangeInfoAPI);
app.post ('/api/auth/change-pass', authChangePassAPI);
app.post ('/api/auth/add-book', authAddBookAPI);
app.post ('/api/auth/remove-book', authRemoveBookAPI);
app.post ('/api/auth/all-books', authAllBookAPI);
app.post ('/api/auth/trade-book', authTradeBookAPI);
app.post ('/api/auth/check-trade', authCheckTradeAPI);
app.post ('/api/auth/in-trade', authInTradeAPI);
app.post ('/api/auth/out-trade', authOutTradeAPI);
app.post ('/api/auth/remove-trade', authRemoveTradeAPI);
app.post ('/api/auth/refuse-trade', authRefuseTradeAPI);
app.post ('/api/auth/accept-trade', authAcceptTradeAPI);

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
