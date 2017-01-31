export const validateSignup = (data) => {
  if ( data.username.trim ().length < 6 )
    return 'Username length have to be more than 6 chars.';

  if ( !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test (data.usermail) )
    return 'Email not valid. Please try again.';

  if ( data.password.length < 8 )
    return 'Password length have to be more than 8 chars.';

  if ( data.password != data.password_confirm )
    return 'Password confirm is different from the first one';

  return false;
};

export const postRequest = (url, data, callback) => {
  let request = new XMLHttpRequest ();
  request.open ('POST', url, true);
  request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  request.onload = () => {
    if ( request.status != 200 )
      return callback ({ error: request.status + ' ' + request.statusText });

    callback (JSON.parse (request.responseText));
  };

  request.onerror = () => console.error ('POST ' + url + '. Request failed.');

  let postData = [];
  for ( let key in data ) {
    if ( !data.hasOwnProperty (key) ) continue;

    postData.push (key + '=' + data[key]);
  }

  request.send (postData.join ('&'));
};
