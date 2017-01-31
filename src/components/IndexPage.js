import React from 'react';
import { Link } from 'react-router';

const IndexPage = React.createClass ({
  render () {
    return (
      <div className="text-center">
        <div className="inline-block">
          <div className="left-side">
            <img src="images/book-trading-club.png" alt="Book Trading Club Logo" />
            <h1>Book Trading Club</h1>

            <p>Welcome in the <em>Book Trading Club</em>! Here you can add your books and trading them with all the others books from our users.</p>
            <p>To start this experience <Link to="/signup">Sign Up</Link> or <Link to="/login">Login</Link></p>
          </div>
          <div className="right-side">
            <h2>Why this?</h2>

            <p>This application was build as project for freeCodeCamp, an other big awesome project where you can learn or improve your web-oriented programming skills.</p>
            <p>This app code was written by <a href="http://neckersbox.eu">Davide Francesco Merico</a> and can be found on <a href="https://github.com/NeckersBOX/book-trading-club/tree/master/src">GitHub</a>.</p>
            <p>Thank you for your interests and feedback! Have a good day!</p>
          </div>
        </div>
      </div>
    );
  }
});

export default IndexPage;
