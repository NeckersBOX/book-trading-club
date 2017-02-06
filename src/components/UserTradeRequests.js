import React from 'react';
import { postRequest, dateAgo, dateFormat } from '../common';

class ShowRequest extends React.Component {
  constructor (props) {
    super (props);

    this.state = { show: true };
  }

  render () {
    if ( !this.state.show )
      return <span></span>;

    return (
      <div>
        <img src={this.props.request.book.book.thumbnail} />
        <div style={{ display: 'block' }} className="text-center">
          <button className="remove" onClick={this.removeTradeRequest.bind (this)}>Remove</button>
        </div>
        <p className="status">Status <b className={this.props.request.status}>{this.props.request.status}</b></p>
        <p className="date">{dateFormat (this.props.request.date)}</p>
      </div>
    );
  }

  removeTradeRequest () {
    postRequest ('/api/auth/remove-trade',
      Object.assign ({}, this.props.request, { book: null }),
      res => {
        if ( res.error ) {
          console.error (res.error);
          return;
        }

        this.setState ({ show: false });
    });
  }
};

class UserTradeRequests extends React.Component {
  constructor (props) {
    super (props);

    this.state = { requests: [], loading: true, expand: false };
  }

  componentDidMount () {
    postRequest ('/api/auth/in-trade', {}, res => {
      if ( res.error ) {
        console.error (res.error);
        return;
      }

      this.setState ({ requests: res.results, loading: false });
    });
  }

  render () {
    if ( !this.state.expand ) {
      return (
        <div className="text-center">
          <div className="inline-block">
            <button className="button-trade-requests" onClick={() => this.setState ({ expand: true })}>
              Your trade requests ( {this.state.loading ? 'Loading..' : this.state.requests.length } )
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="inline-block trade-requests">
          <button className="button-trade-requests" onClick={() => this.setState ({ expand: false })}>
            Close details
          </button>

          <h3>Trade requests <span className="badge">{this.state.requests.length}</span></h3>
          <hr />

          {this.state.loading ? 'Loading..' : !this.state.requests.length ? 'No requests yet!' :
            this.state.requests.map ((request, id) => <ShowRequest request={request} key={id} />)}
        </div>
      </div>
    );
  }
};

export default UserTradeRequests;
