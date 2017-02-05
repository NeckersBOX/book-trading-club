export const validatePassword = (password, confirm) => {
  if ( password.length < 8 )
    return 'Password length have to be more than 8 chars.';

  if ( password != confirm )
    return 'Password confirm is different from the first one';

  return false;
}

export const validateSignup = (data) => {
  if ( data.username.trim ().length < 6 )
    return 'Username length have to be more than 6 chars.';

  if ( !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test (data.usermail) )
    return 'Email not valid. Please try again.';

  return validatePassword (data.password, data.password_confirm);
};

export const validateLogin = (data) => {
  if ( data.username.trim ().length < 6 )
    return 'Username length have to be more than 6 chars.';

  if ( data.password.length < 8 )
    return 'Password length have to be more than 8 chars.';

  return false;
}

export const ellipseTitle = (title) => {
  if ( title.length < 64 )
    return title;

  return title.split ('').slice (0, 60).concat ('...').join ('');
};

export const postRequest = (url, data, callback) => {
  let request = new XMLHttpRequest ();
  request.open ('POST', url, true);
  request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  request.onload = () => {
    if ( request.status != 200 )
      return callback ({ error: request.status + ' ' + request.statusText });

    let response = JSON.parse (request.responseText);

    if ( !response.hasOwnProperty ('error') )
      response = Object.assign ({}, response, { error: false });

    callback (response);
  };

  request.onerror = () => console.error ('POST ' + url + '. Request failed.');

  let postData = [];
  for ( let key in data ) {
    if ( !data.hasOwnProperty (key) ) continue;

    postData.push (key + '=' + data[key]);
  }

  request.send (postData.join ('&'));
};
