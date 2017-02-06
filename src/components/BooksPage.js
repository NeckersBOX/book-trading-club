import React from 'react';
import AuthRequest from './AuthRequest';
import { UserBooks, UserBookInfo } from './UserBooks';
import { postRequest } from '../common';
import { AllBooks, BookInfo } from './AllBooks';
import UserTradeRequests from './UserTradeRequests';
import TradeRequests from './TradeRequests';

class BooksPage extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      books: [],
      loading: true,
      expandTrades: { in: false, out: false },
      user_books: (this.props.reduxState ? this.props.reduxState.books : [])
    };
  }

  componentDidMount () {
    postRequest ('/api/auth/all-books', {}, res => {
      if ( res.error ) {
        console.error (res.error);
        return;
      }

      this.setState ({ books: res.books, loading: false, message: null });
    });

    postRequest ('/api/auth/user-books', {}, res => {
      if ( res.error ) {
        console.error (res.error);
        return;
      }

      this.setState ({ user_books: res.books });
    });
  }

  render () {
    return (
      <AuthRequest auth={this.props.reduxState && this.props.reduxState.auth} dispatch={this.props.dispatch}>
        <div className={"books-trades" + ((this.state.expandTrades.in || this.state.expandTrades.out) ? ' expanded' : '')}>
          <UserTradeRequests expand={state => this.expandTrades (state, 'in')}/>
          <TradeRequests expand={state => this.expandTrades (state, 'out')} />
        </div>

        <UserBooks dispatch={this.props.dispatch}>
          {this.state.user_books.length ? this.state.user_books.map ((bookInfo, idx) =>
            <UserBookInfo key={idx}
              book={bookInfo.book}
              book_id={bookInfo.date}
              removeBook={this.removeBook.bind (this)} />) : <h3>No books yet!</h3>}
        </UserBooks>
        {this.state.message ? <p className="message">{this.state.message}</p> : ''}
        <AllBooks>
          {this.state.books.length ? this.state.books.map ((bookInfo, idx) =>
            <BookInfo key={idx} bookInfo={bookInfo} tradeBook={this.tradeBook.bind(this)} />
          ) : <h3>{this.state.loading ? 'Loading..' : 'No books yet!'}</h3>}
        </AllBooks>
      </AuthRequest>
    );
  }

  removeBook (book_id) {
    postRequest ('/api/auth/remove-book', { book_id }, res => {
      if ( res.error ) {
        this.setState ({ message: res.error });
        return;
      }

      this.props.dispatch ({
        type: 'REMOVE_BOOK',
        data: book_id
      });

      this.componentDidMount ();
    });
  }

  tradeBook (bookInfo, success_callback) {
    postRequest ('/api/auth/trade-book', {
      book_user: bookInfo.user,
      book_date: bookInfo.date
    }, res => {
      if ( res.error ) {
        this.setState ({ message: res.error });
        return;
      }

      this.setState ({ message: null });
      success_callback ();
    });
  }

  expandTrades (state, type) {
    this.setState ({
      expandTrades: Object.assign ({}, this.state.expandTrades, { [type]: state })
    });
  }
};

export default BooksPage;
