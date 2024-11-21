window.onload = function () {
  var urlParams = {};
  (function () {
    var pair, // Really a match. Index 0 is the full match; 1 & 2 are the key & val.
      tokenize = /([^&=]+)=?([^&]*)/g,
      // decodeURIComponents escapes everything but will leave +s that should be ' '
      re_space = function (s) { return decodeURIComponent(s.replace(/\\+/g, " ")); },
      // Substring to cut off the leading '?'
      querystring = window.location.search.substring(1);
    while (pair = tokenize.exec(querystring))
      urlParams[re_space(pair[1])] = re_space(pair[2]);
  })();

  var id = urlParams['id'];
  var base = '/api'
  document.getElementById('form').setAttribute('action', base + '/apps/' + id + '/request_password_reset');
  document.getElementById('username').value = urlParams['username'];
  document.getElementById('username_label').appendChild(document.createTextNode(urlParams['username']));
  document.getElementById("password").oninput = checkPassword;
  document.getElementById("password_confirm").oninput = checkConfirmPassword;
  //document.getElementById("change_password").disabled = true;
  document.getElementById('token').value = urlParams['token'];

  if (urlParams['error']) {
    document.getElementById('error').appendChild(document.createTextNode(urlParams['error']));
  }
  if (urlParams['app']) {
    document.getElementById('app').appendChild(document.createTextNode(urlParams['app']));
  }

  function checkConfirmPassword () {
    var pass2 = document.getElementById("password").value;
    var pass1 = document.getElementById("password_confirm").value;
    if (pass1 !== pass2) {
      document.getElementById("password_confirm").setCustomValidity('两次密码输入不一致')
    } else {
      document.getElementById("password_confirm").setCustomValidity('')
    }
  }

  function checkPassword () {
    var el = document.getElementById("password")
    var pass = el.value;
    if (/^[\w-\(\)\!\@#\$\%\^\&\*]{6,24}$/g.test(pass)) {
      el.setCustomValidity('')
    } else {
      el.setCustomValidity('密码格式不正确')
    }
  }

}