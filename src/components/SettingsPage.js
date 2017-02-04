import React from 'react';
import AuthRequest from './AuthRequest';
import { postRequest, validatePassword } from '../common';

class SettingsPage extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      userfullname: '',
      usercity: '',
      userstate: '',
      old_password: '',
      new_password: '',
      confirm_password: '',
      message_info: null,
      message_pass: null
    };
  }

  componentDidMount () {
    if ( this.props.reduxState ) {
      this.setState ({
        userfullname: this.props.reduxState.fullname,
        usercity: this.props.reduxState.city,
        userstate: this.props.reduxState.state
      });
    }
  }

  render () {
    return (
      <AuthRequest auth={this.props.reduxState && this.props.reduxState.auth} dispatch={this.props.dispatch}>
        <div className="text-center">
          <button className="inline-block logout" onClick={this.doLogout.bind (this)}>Logout</button>

          <div className="text-center">
            <form className="inline-block form-settings">
              {this.state.message_info ? <p>{this.state.message_info}</p> : ''}

              <label>
                Full Name
                <input type="text" name="fullname" value={this.state.userfullname}
                  onChange={(e) => this.updateInfo ('userfullname', e)} />
              </label>
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

              <input type="submit" value="Update Info" onClick={this.changeInfo.bind (this)}/>
            </form>
          </div>

          <div className="text-center">
            <form className="inline-block form-settings">
              {this.state.message_pass ? <p>{this.state.message_pass}</p> : ''}

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

              <input type="submit" value="Change password" onClick={this.changePassword.bind (this)}/>
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

  changeInfo (e) {
    e.preventDefault ();

    const userInfo = {
      fullname: this.state.userfullname.trim (),
      city: this.state.usercity.trim (),
      state: this.state.userstate.trim ()
    };

    postRequest ('/api/auth/change-info', userInfo, res => {
      if ( res.error )
        return this.setState ({ message_info: res.error });

      this.setState ({
        userfullname: userInfo.fullname,
        usercity: userInfo.city,
        userstate: userInfo.state,
        message_info: 'Personal info changed!'
      });

      this.props.dispatch ({
        type: 'UPDATE_INFO',
        data: userInfo
      });
    });
  }

  changePassword (e) {
    e.preventDefault ();

    let result = validatePassword (this.state.new_password, this.state.confirm_password);

    if ( result )
      return this.setState ({ message_pass: result });

    postRequest ('/api/auth/change-pass', {
      old_password: this.state.old_password,
      new_password: this.state.new_password
    }, res => {
      if ( res.error )
        return this.setState ({ message_pass: res.error });

      this.setState ({ message_pass: 'Password changed!' });
    });
  }
}

export default SettingsPage;
