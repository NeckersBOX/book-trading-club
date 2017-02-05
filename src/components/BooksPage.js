import React from 'react';
import AuthRequest from './AuthRequest';
import { UserBooks, UserBookInfo } from './UserBooks';
import { postRequest } from '../common';
import { AllBooks, BookInfo } from './AllBooks';

class BooksPage extends React.Component {
  constructor (props) {
    super (props);

    this.state = { books: [], loading: true };
  }

  componentDidMount () {
    postRequest ('/api/auth/all-books', {}, res => {
      if ( res.error ) {
        console.error (res.error);
        return;
      }

      this.setState ({ books: res.books, loading: false });
    });
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
        <AllBooks>
          {this.state.books.length ? this.state.books.map ((bookInfo, idx) =>
            <BookInfo key={idx} bookInfo={bookInfo}
              tradeBook={this.tradeBook.bind(this)} />) :
            <h3>{this.state.loading ? 'Loading..' : 'No books yet!'}</h3>}
        </AllBooks>
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

  tradeBook (book_id) {
    console.log (book_id);
  }
};

export default BooksPage;
