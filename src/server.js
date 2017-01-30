import Express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';

let app = new Express ();

app.set ('view engine', 'ejs');
app.set ('views', path.join (__dirname, 'views'));

app.use (Express.static ('dist'));

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
