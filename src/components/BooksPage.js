import React from 'react';
import AuthRequest from './AuthRequest';
import { UserBooks, UserBookInfo } from './UserBooks';
import { postRequest } from '../common';

class BooksPage extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    let userBooksList = [];
    if ( this.props.reduxState )
      userBooksList = this.props.reduxState.books;

    return (
      <AuthRequest auth={this.props.reduxState && this.props.reduxState.auth} dispatch={this.props.dispatch}>
        <UserBooks dispatch={this.props.dispatch}>
          {userBooksList.length ? userBooksList.map ((bookInfo, idx) =>
              <UserBookInfo key={idx}
                book={bookInfo.book}
                book_id={bookInfo.date}
                removeBook={this.removeBook.bind (this)} />) : <h3>No books yet!</h3>}
        </UserBooks>
      </AuthRequest>
    );
  }

  removeBook (book_id) {
    postRequest ('/api/auth/remove-book', { book_id }, res => {
      if ( res.error ) {
        console.error (res.error);
        return;
      }

      this.props.dispatch ({
        type: 'REMOVE_BOOK',
        data: book_id
      });
    });
  }
};

export default BooksPage;
