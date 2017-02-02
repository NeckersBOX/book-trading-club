export const reducer = (state, action) => {
  if ( typeof state == 'undefined' )
    return {
      auth: false,
      name:  undefined,
      email: undefined,
      city:  undefined,
      state: undefined,
      books: []
    };

  let newState = state;

  switch (action.type) {
    case 'LOGIN':
      newState = Object.assign ({}, state, { auth: true }, action.data);
      break;
  }

  return newState;
};
