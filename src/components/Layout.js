import React from 'react';
import { Link } from 'react-router';

const Layout = React.createClass ({
  render () {
    return (
      <div>
        <div className="clearfix">
          <ul className="unauth-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {this.props.children}
      </div>
    );
  }
});

export default Layout;
