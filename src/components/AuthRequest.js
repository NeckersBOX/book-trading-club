import React from 'react';
import { postRequest } from '../common';

class AuthRequest extends React.Component {
  constructor (props) {
    super (props);

    this.state = { auth: this.props.auth };
  }

  componentDidMount () {
    postRequest ('/api/auth/check', {}, res => {
      if ( res.success )
        this.setState ({ auth: true });
      else
        this.setState ({ auth: false });
    });
  }

  render () {
    if ( this.state.auth ) {
      return <div>{this.props.children}</div>;
    }

    return (
      <div className="text-center">
        <div className="inline-block">
          <div className="login-success">
            <h2>Auth Requested</h2>

            <p>Sorry, this page is only for authenticated users.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default AuthRequest;
