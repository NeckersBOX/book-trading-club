import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout       from './components/Layout';
import IndexPage    from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import SignUpPage   from './components/SignUpPage';
import LoginPage    from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import BooksPage    from './components/BooksPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage} />
    <Route path="signup" component={SignUpPage} />
    <Route path="login" component={LoginPage} />
    <Route path="settings" component={SettingsPage} />
    <Route path="books" component={BooksPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
