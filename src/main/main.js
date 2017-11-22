function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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
  return `
    <p>Sign Up</p>
    <div class='form'>
      <p>Username</p>
      <input>
      <p>Password</p>
      <input type="password">
      <button onclick='window.handleSubmit("sign-up")' class="submit">Submit</button>
    </div>
  `;
}

function gamesLayout() {
  return `
    <p>Games</p>
    <ul>
      <li>
        <a href='./dots'>Dots</a>
      </li>
    </ul>
  `;
}

function loginLayout() {
  return `
    <p>Login</p>
    <div class='form'>
    <p>Username</p>
    <input>
    <p>Password</p>
    <input type="password">
    <button onclick='window.handleSubmit("login")' class="submit">Submit</button>
    </div>
  `;
}

window.buttons = [];
window.handleSubmit = function (id) {
  const inputs = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName('input'), 0);
  const username = inputs[0].value;
  const password = inputs[1].value;
  $.post(`./${id}`, { username, password }, (data) => {
    document.cookie = `username=${username}`
    document.cookie = `_id=${data._id}`
  });
}

function registerClicks() {
  const login = document.getElementById('login');
  const signUp = document.getElementById('sign-up');
  const games = document.getElementById('games');
  const username = getCookie('username');
  const _id = getCookie('_id');
  if (username && _id) {
    document.getElementById('player-profile').innerHTML = `Hi ${username}, Welcome Back`;
    login.parentNode.removeChild(login);
    signUp.parentNode.removeChild(signUp);
    window.buttons = window.buttons.concat([
      games,
    ]);
    window.buttons.forEach(button => button.addEventListener('click', handleClicks));
    return false;
  }

  window.buttons = window.buttons.concat([
    login,
    signUp,
    games,
  ]);

  window.buttons.forEach(button => button.addEventListener('click', handleClicks));
}

function handleClicks(e) {
  const map = {
    Login: 'login',
    'Sign Up': 'sign-up',
    Games: 'games',
  };
  const { innerHTML } = e.target;

  const key = Object.keys(map).filter(key => map[key] === e.target.id).pop();
  if (key !== innerHTML) { return false; }

  window.buttons.forEach(button => {
    if (innerHTML !== button.innerHTML) {
      button.removeAttribute('style')
      button.innerHTML = Object.keys(map).filter(key => map[key] === button.id).pop();
    }
  });

  const target = document.getElementById(map[innerHTML]);

  target.style.height = '500px';
  target.style.width = '400px';
  setTimeout(() => target.innerHTML = htmlToIdMap[map[innerHTML]](), 800);
}

const htmlToIdMap = {
  'sign-up': signUpLayout,
  'games': gamesLayout,
  'login': loginLayout,
};

window.onload = registerClicks;
