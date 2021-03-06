import React from 'react';
import { Link } from 'react-router';
import { postRequest } from '../common';

const UnauthMenu = () => (
  <div className="text-center">
    <ul className="main-menu">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </div>
);

const AuthMenu = () => (
  <div className="text-center">
    <ul className="main-menu">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/books">Books</Link></li>
      <li><Link to="/settings">Settings</Link></li>
    </ul>
  </div>
);

class Layout extends React.Component {
  constructor (props) {
    super (props);
  }

  componentDidMount () {
    if ( this.props.reduxState && !this.props.reduxState.auth ) {
      postRequest ('/api/auth/login', {}, res => {
        if ( res.success ) {
          this.props.dispatch ({
            type: 'LOGIN',
            data: res.userInfo
          });
        }
      });
    }
  }

  render () {
    if ( this.props.reduxState && this.props.reduxState.auth ) {
      return (
        <div>
          <AuthMenu />

          {this.props.children}
        </div>
      );
    }

    return (
      <div>
        <UnauthMenu />

        <div className="text-center">
          <div className="inline-block">
            <div className="left-side">
              <img src="images/book-trading-club.png" alt="Book Trading Club Logo" />
              <h1>Book Trading Club</h1>

              <p>Welcome in the <em>Book Trading Club</em>! Here you can add your books and trading them with all the others books from our users.</p>
              <p>To start this experience <Link to="/signup">Sign Up</Link> or <Link to="/login">Login</Link></p>
            </div>
            <div className="right-side">
              {this.props.children}
            </div>
            <div className="bookmark"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
