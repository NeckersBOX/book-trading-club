import React from 'react';
import { postRequest, ellipseTitle } from '../common';

export const UserBookInfo = (props) => (
  <div className="book-info">
    <img src={props.book.thumbnail} alt={ellipseTitle (props.book.title)} />
    <button onClick={() => props.removeBook (props.book_id)}>Remove</button>
  </div>
);

export class UserBooks extends React.Component {
  constructor (props) {
    super (props);

    this.state = { bookname: '', message: null };
  }

  render () {
    return (
      <div className="text-center">
        <div className="inline-block my-books">
          <div className="clearfix header">
            <h2>My Books</h2>
            <form>
              <input type="text" name="add-book" value={this.state.bookname}
                onChange={(e) => this.setState ({ bookname: e.target.value })}/>
              <input type="submit" value="Add book" onClick={this.addBook.bind (this)} />
            </form>
          </div>
          <hr />
          {this.state.message ? <p className="message">{this.state.message}</p> : ''}

          <div className="list">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  addBook (e) {
    e.preventDefault ();

    if ( this.state.bookname.trim ().length < 1 ) {
      this.setState ({ message: 'At least 1 character for the book name' });
      return;
    }

    postRequest ('/api/auth/add-book', {
      bookname: this.state.bookname
    }, res => {
      if ( res.error ) {
        this.setState ({ message: res.error });
        return;
      }

      this.setState ({ message: null, bookname: '' });
      this.props.dispatch ({
        type: 'ADD_BOOK',
        data: { user: res.user, book: res.book }
      });
    });
  }
};
