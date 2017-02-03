const initState = {
  auth: false,
  name:  undefined,
  email: undefined,
  city:  undefined,
  state: undefined,
  books: []
};

export const reducer = (state, action) => {
  if ( typeof state == 'undefined' )
    return initState;

  let newState = state;

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
  }

  return newState;
};
