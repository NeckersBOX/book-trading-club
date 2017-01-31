import React from 'react';

const SignUpPage = React.createClass ({
  getInitialState () {
    return {
      username: '',
      usermail: '',
      password: '',
      password_confirm: '',
      result: null
    };
  },
  render () {
    return (
      <div>
        <small className="page-title">Sign Up</small>

        <h2>Sign Up</h2>

        {this.state.result ? <p className="message">{this.state.result}</p> : ''}

        <form className="signup-form">
          <label>
            Username
            <input type="text" name="username"
              onChange={(e) => this.updateInfo ('username', e)}
              value={this.state.username} />
          </label>

          <label>
            Mail
            <input type="text" name="usermail"
              onChange={(e) => this.updateInfo ('usermail', e)}
              value={this.state.usermail} />
          </label>

          <label>
            Password
            <input type="password" name="password"
              onChange={(e) => this.updateInfo ('password', e)}
              value={this.state.password} />
          </label>

          <label>
            Confirm Password
            <input type="password" name="password_confirm"
              onChange={(e) => this.updateInfo ('password_confirm', e)}
              value={this.state.password_confirm} />
          </label>

          <input type="submit" value="Sign Up" onClick={this.doSignUp} />
        </form>
      </div>
    );
  },
  updateInfo (field, event) {
    this.setState ({ [field]: event.target.value });
  },
  doSignUp (e) {
    e.preventDefault ();

  }
});

export default SignUpPage;
