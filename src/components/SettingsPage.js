import React from 'react';
import AuthRequest from './AuthRequest';

class SettingsPage extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <AuthRequest auth={this.props.reduxState && this.props.reduxState.auth}>
        <div className="text-center">
          <button className="inline-block logout">Logout</button>

          <div className="text-center">
            <form className="inline-block form-settings">
              <label>
                City <input type="text" name="usercity" />
              </label>
              <label>
                State <input type="text" name="userstate" />
              </label>

              <input type="submit" value="Update Info" />
            </form>
          </div>

          <div className="text-center">
            <form className="inline-block form-settings">
              <label>
                Old password <input type="password" name="old_password" />
              </label>
              <label>
                New password <input type="password" name="new_password" />
              </label>
              <label>
                Confirm password <input type="password" name="confirm_password" />
              </label>

              <input type="submit" value="Change password" />
            </form>
          </div>
        </div>
      </AuthRequest>
    );
  }
}

export default SettingsPage;
