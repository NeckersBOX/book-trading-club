import React from 'react';

const NotFoundPage = React.createClass ({
  render () {
    return (
      <div>
        <small className="page-title">404</small>

        <h2>Not Found Page</h2>

        <p>Sorry but this page doesn't exists</p>
      </div>
    );
  }
});

export default NotFoundPage;
