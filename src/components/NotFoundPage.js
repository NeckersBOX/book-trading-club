import React from 'react';

class NotFoundPage extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    if ( this.props.reduxState && this.props.reduxState.auth ) {
      return (
        <div className="text-center">
          <div className="inline-block">
            <div className="login-success">
              <h2>Not Found Page</h2>

              <p>Sorry but this page doesn't exists</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <small className="page-title">404</small>

        <h2>Not Found Page</h2>

        <p>Sorry but this page doesn't exists</p>
      </div>
    );
  }
};

export default NotFoundPage;
