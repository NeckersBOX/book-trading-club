import React from 'react';
import { validateLogin, postRequest } from '../common'

class LoginPage extends React.Component {
  constructor (props) {
    super (props);

    this.state = { username: '', password: '', result: null };
  }

  render () {
    if ( this.props.reduxState && this.props.reduxState.auth ) {
      return (
        <div className="text-center">
          <div className="inline-block">
            <div className="login-success">
              <h2>Success!</h2>

              <p>Welcome back <b>{this.props.reduxState.name}</b>!</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <small className="page-title">Login</small>

        <h2>Login</h2>

        {this.state.result ? <p className="message">{this.state.result}</p> : ''}

        <form className="auth-form">
          <label>
            Username
            <input type="text" name="username"
              onChange={(e) => this.updateInfo ('username', e)}
              value={this.state.username} />
          </label>

          <label>
            Password
            <input type="password" name="password"
              onChange={(e) => this.updateInfo ('password', e)}
              value={this.state.password} />
          </label>

          <input type="submit" value="Login" onClick={this.doLogin.bind (this)} />
        </form>
      </div>
    );
  }

  updateInfo (field, event) {
    this.setState ({ [field]: event.target.value });
  }

  doLogin (e) {
    e.preventDefault ();

    let res = validateLogin (this.state);
    if ( res )
      this.setState ({ result: res });
    else {
      this.setState ({ result: 'Loading..' });

      postRequest ('/api/login', this.state, res => {
        if ( res.error ) {
          this.setState ({ result: res.error });
          return;
        }

        this.props.dispatch ({
          type: 'LOGIN',
          data: res.userInfo
        });
      });
    }
  }
}

export default LoginPage;
