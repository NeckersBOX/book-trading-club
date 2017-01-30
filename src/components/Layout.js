import React from 'react';

const Layout = React.createClass ({
  render () {
    return (
      <div>
        <h1>Layout</h1>
        {this.props.children}
      </div>
    );
  }
});

export default Layout;
