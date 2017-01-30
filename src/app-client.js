import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

window.onload = () => {
  ReactDOM.render (
    <Router
      history={browserHistory}
      routes={routes}
      onUpdate={() => window.scrollTo (0, 0)}
    />,
    document.getElementById ('container')
  );
};
