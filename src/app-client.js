import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import routes from './routes';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import { reducer } from './store';

const store = createStore (reducer);

class AppRouter extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const useExtraProps = {
      renderRouteComponent: child => React.cloneElement (child, {
        reduxState: this.props.state,
        dispatch: this.props.dispatch
      })
    };

    return (
      <Router
        history={browserHistory}
        routes={routes}
        onUpdate={() => window.scrollTo (0, 0)}
        render={applyRouterMiddleware (useExtraProps)}
        />
    );
  }
};

const RouterConnect = connect (state => ({ state }))(AppRouter);

window.onload = () => {
  ReactDOM.render (
    <Provider store={store}>
      <RouterConnect />
    </Provider>,
    document.getElementById ('container')
  );
};
