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

export const dateFormat = timestamp => {
  let diff = Math.floor (Math.abs (Date.now () - timestamp) / 1000);
  if ( diff > 4 * 24 * 60 * 60 ) {
    let date = new Date (timestamp).toString ().split (' ');

    return date.slice (0, date.length - 2).join (' ');
  }

  let values = [ [ 'day', 24 * 60 * 60 ], [ 'hour', 60 * 60 ], [ 'minute', 60 ], [ 'second', 1 ] ];
  let results = [];
  let string = '';

  for ( let j = 0; j < values.length; j++ ) {
    let res = Math.floor (diff / values[j][1]);
    if ( res == 0 )
      continue;

    results.push (res + ' ' + values[j][0] + ((res != 1) ? 's' : ''));
    diff -= res * values[j][1];
  }

  string += results[0] || 'unknown';
  for ( let j = 1; j < results.length; j++ ) {
    if ( j > 1 && j == results.length - 1 )
      string += ' and ';
    else
      string += ', ';

    string += results[j];
  }

  return string + ' ago';
};
