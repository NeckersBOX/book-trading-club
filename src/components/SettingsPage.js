import React from 'react';
import AuthRequest from './AuthRequest';
import { postRequest } from '../common';

class SettingsPage extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      usercity: '',
      userstate: '',
      old_password: '',
      new_password: '',
      confirm_password: ''
    };
  }

  render () {
    return (
      <AuthRequest auth={this.props.reduxState && this.props.reduxState.auth}>
        <div className="text-center">
          <button className="inline-block logout" onClick={this.doLogout.bind (this)}>Logout</button>

          <div className="text-center">
            <form className="inline-block form-settings">
              <label>
                City
                <input type="text" name="usercity" value={this.state.usercity}
                  onChange={(e) => this.updateInfo ('usercity', e)} />
              </label>
              <label>
                State
                <input type="text" name="userstate" value={this.state.userstate}
                  onChange={(e) => this.updateInfo ('userstate', e)} />
              </label>

              <input type="submit" value="Update Info" />
            </form>
          </div>

          <div className="text-center">
            <form className="inline-block form-settings">
              <label>
                Old password
                <input type="password" name="old_password" value={this.state.old_password}
                  onChange={(e) => this.updateInfo ('old_password', e)} />
              </label>
              <label>
                New password
                <input type="password" name="new_password" value={this.state.new_password}
                  onChange={(e) => this.updateInfo ('new_password', e)} />
              </label>
              <label>
                Confirm password
                <input type="password" name="confirm_password" value={this.state.confirm_password}
                  onChange={(e) => this.updateInfo ('confirm_password', e)} />
              </label>

              <input type="submit" value="Change password" />
            </form>
          </div>
        </div>
      </AuthRequest>
    );
  }

  updateInfo (field, event) {
    this.setState ({ [field]: event.target.value });
  }

  doLogout () {
    postRequest ('/api/auth/logout', {}, res => {
      if ( res.error )
        return console.error (res.error);

      this.props.dispatch ({
        type: 'LOGOUT'
      });
      
      this.props.router.push ('/login');
    });
  }
}

export default SettingsPage;
