import React from 'react';
import AuthRequest from './AuthRequest';

class SettingsPage extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <AuthRequest auth={this.props.reduxState && this.props.reduxState.auth}>
        <h2>Hello World</h2>
      </AuthRequest>
    );
  }
}

export default SettingsPage;
