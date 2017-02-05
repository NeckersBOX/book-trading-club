import React from 'react';
import { ellipseTitle, postRequest } from '../common';

export const AllBooks = (props) => (
  <div className="text-center">
    <div className="inline-block all-books">
      <h2>All Books</h2>
      <hr />
      <div className="clearfix">
        {props.children}
      </div>
    </div>
  </div>
);

export class BookInfo extends React.Component {
  constructor (props) {
    super (props);

    this.state = { trade: false, loading: true };
  }

  componentDidMount () {
    postRequest ('/api/auth/check-trade', {
      book_user: this.props.bookInfo.user,
      book_date: this.props.bookInfo.date
    }, res => {
      if ( res.error ) {
        console.error (this.props.bookInfo.data + '@' + this.props.bookInfo.user + ': ' + res.error);
        return;
      }

      this.setState ({ trade: res.status, loading: false });
    });
  }

  render () {
    let bookButton = <button className="disabled">Loading..</button>;

    if ( !this.state.loading ) {
      if ( this.state.trade )
        bookButton = <button className="disabled">In trading</button>;
      else
        bookButton = <button onClick={this.tradeBookAction.bind (this)}>Trade</button>;
    }

    return (
      <div className="inline-block book-info">
        <img src={this.props.bookInfo.book.thumbnail} alt={ellipseTitle (this.props.bookInfo.book.title)} />
        {bookButton}
      </div>
    )
  }

  tradeBookAction () {
    this.props.tradeBook (this.props.bookInfo, () => this.setState ({ trade: true }));
  }
};
