'use strict';

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function signUpLayout() {
  return '\n    <p>Sign Up</p>\n    <div class=\'form\'>\n      <p>Username</p>\n      <input>\n      <p>Password</p>\n      <input type="password">\n      <button onclick=\'window.handleSubmit("sign-up")\' class="submit">Submit</button>\n    </div>\n  ';
}

function gamesLayout() {
  return '\n    <p>Games</p>\n    <ul>\n      <li>\n        <a href=\'./dots\'>Dots</a>\n        <a href=\'./tictactoe\'>Tictactoe</a>\n      </li>\n    </ul>\n  ';
}

function loginLayout() {
  return '\n    <p>Login</p>\n    <div class=\'form\'>\n    <p>Username</p>\n    <input>\n    <p>Password</p>\n    <input type="password">\n    <button onclick=\'window.handleSubmit("login")\' class="submit">Submit</button>\n    </div>\n  ';
}

window.buttons = [];
window.handleSubmit = function (id) {
  var _this = this;

  var inputs = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName('input'), 0);
  var username = inputs[0].value;
  var password = inputs[1].value;
  $.post('./' + id, { username: username, password: password }, function (data) {
    document.cookie = 'username=' + username;
    document.cookie = '_id=' + data._id;
    _this.location = window.location.href;
  });
};

function registerClicks() {
  var login = document.getElementById('login');
  var signUp = document.getElementById('sign-up');
  var games = document.getElementById('games');
  var username = getCookie('username');
  var _id = getCookie('_id');
  if (username && _id) {
    document.getElementById('player-profile').innerHTML = 'Hi ' + username + ', Welcome Back';
    login.parentNode.removeChild(login);
    signUp.parentNode.removeChild(signUp);
    window.buttons = window.buttons.concat([games]);
    window.buttons.forEach(function (button) {
      return button.addEventListener('click', handleClicks);
    });
    return false;
  }

  window.buttons = window.buttons.concat([login, signUp, games]);

  window.buttons.forEach(function (button) {
    return button.addEventListener('click', handleClicks);
  });
}

function handleClicks(e) {
  var map = {
    Login: 'login',
    'Sign Up': 'sign-up',
    Games: 'games'
  };
  var innerHTML = e.target.innerHTML;


  var key = Object.keys(map).filter(function (key) {
    return map[key] === e.target.id;
  }).pop();
  if (key !== innerHTML) {
    return false;
  }

  window.buttons.forEach(function (button) {
    if (innerHTML !== button.innerHTML) {
      button.removeAttribute('style');
      button.innerHTML = Object.keys(map).filter(function (key) {
        return map[key] === button.id;
      }).pop();
    }
  });

  var target = document.getElementById(map[innerHTML]);

  target.style.height = '500px';
  target.style.width = '400px';
  setTimeout(function () {
    return target.innerHTML = htmlToIdMap[map[innerHTML]]();
  }, 800);
}

var htmlToIdMap = {
  'sign-up': signUpLayout,
  'games': gamesLayout,
  'login': loginLayout
};

window.onload = registerClicks;