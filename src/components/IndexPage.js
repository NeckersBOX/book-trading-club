import React from 'react';

class IndexPage extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    if ( this.props.reduxState && this.props.reduxState.auth ) {
      return (
        <div className="text-center">
          <div className="inline-block">
            <div className="login-success">
              <div className="text-center">
                <img src="images/book-trading-club.png" alt="Book Trading Club Logo" />
              </div>

              <h2>Why this?</h2>

              <div className="text-justify">
                <p>This application was build as project for freeCodeCamp, an other big awesome project where you can learn or improve your web-oriented programming skills.</p>
                <p>This app code was written by <a href="http://neckersbox.eu">Davide Francesco Merico</a> and can be found on <a href="https://github.com/NeckersBOX/book-trading-club/tree/master/src">GitHub</a>.</p>
                <p>Thank you for your interests and feedback! Have a good day!</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <small className="page-title">Home</small>

        <h2>Why this?</h2>

        <p>This application was build as project for freeCodeCamp, an other big awesome project where you can learn or improve your web-oriented programming skills.</p>
        <p>This app code was written by <a href="http://neckersbox.eu">Davide Francesco Merico</a> and can be found on <a href="https://github.com/NeckersBOX/book-trading-club/tree/master/src">GitHub</a>.</p>
        <p>Thank you for your interests and feedback! Have a good day!</p>
      </div>
    );
  }
};

export default IndexPage;
