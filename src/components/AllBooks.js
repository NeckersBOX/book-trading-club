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

export const BookInfo = (props) => (
  <div className="inline-block book-info">
    <img src={props.bookInfo.book.thumbnail} alt={ellipseTitle (props.bookInfo.book.title)} />
    <button onClick={() => props.tradeBook (props.bookInfo)}>Trade</button>
  </div>
);
