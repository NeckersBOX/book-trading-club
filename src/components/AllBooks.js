import React from 'react';
import { ellipseTitle } from '../common';

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

    this.state = { trade: props.bookInfo.trade_request ? true : false };
  }

  render () {
    return (
      <div className="inline-block book-info">
        <img src={this.props.bookInfo.book.thumbnail} alt={ellipseTitle (this.props.bookInfo.book.title)} />
        {this.state.trade ? <button className="disabled">In trading</button> :
          <button onClick={this.tradeBookAction.bind (this)}>Trade</button>}
      </div>
    )
  }

  tradeBookAction () {
    this.props.tradeBook (this.props.bookInfo, () => this.setState ({ trade: true }));
  }
};
