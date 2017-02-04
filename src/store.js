const initState = {
  auth: false,
  fullname: undefined,
  name:     undefined,
  email:    undefined,
  city:     undefined,
  state:    undefined,
  books: []
};

export const reducer = (state, action) => {
  if ( typeof state == 'undefined' )
    return initState;

  let newState = state;
  let newBooks = null;

  switch (action.type) {
    case 'LOGIN':
      newState = Object.assign ({}, state, { auth: true }, action.data);
      break;
    case 'LOGOUT':
      newState = Object.assign ({}, initState);
      break;
    case 'UPDATE_INFO':
      newState = Object.assign ({}, state, action.data);
      break;
    case 'ADD_BOOK':
      newBooks = state.books.slice (0);
      newBooks.push (action.data);

      newState = Object.assign ({}, state, { books: newBooks });
      break;
    case 'REMOVE_BOOK':
      newBooks = [];
      for ( let id in state.books ) {
        if ( state.books[id].date == action.data )
          continue;

        newBooks.push (state.books[id]);
      }

      newState = Object.assign ({}, state, { books: newBooks });
      break;
  }

  return newState;
};
