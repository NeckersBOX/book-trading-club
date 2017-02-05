import React from 'react';
import { Link } from 'react-router';
import { postRequest } from '../common';

class AuthRequest extends React.Component {
  constructor (props) {
    super (props);

    this.state = { auth: this.props.auth, loading: true };
  }

  componentDidMount () {
    postRequest ('/api/auth/check', {}, res => {
      if ( res.success )
        this.setState ({ auth: true, loading: false });
      else {
        this.setState ({ auth: false, loading: false });
        if ( this.props.dispatch ) {
          this.props.dispatch ({
            type: 'LOGOUT'
          });
        }
      }
    });
  }

  render () {
    if ( this.state.loading ) {
      return <h3 style={{ color: 'white' }}>Check auth..</h3>;
    }

    if ( this.state.auth ) {
      return <div>{this.props.children}</div>;
    }

    return (
      <div className="text-center">
        <div className="inline-block">
          <div className="login-success">
            <h2>Auth Requested</h2>

            <p>Sorry, this page is only for authenticated users. To continue <Link to="/signup">Sign Up</Link> or <Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
    );
  }
};

export default AuthRequest;
