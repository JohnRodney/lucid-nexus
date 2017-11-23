'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _port = require('./settings/port');

var _port2 = _interopRequireDefault(_port);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _devmongo = require('./settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

router.get('/dots', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/dots/', 'index.html'));
});

router.get('/images/red-devil-skin.png', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/dots/', 'red-devil-skin.png'));
});

router.get('/images/blueface.png', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/dots/', 'blueface.png'));
});

router.get('/images/green-goat.png', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/dots/', 'green-goat.png'));
});

router.get('/dots/bundle.js', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/dots/', 'bundle.js'));
});

router.get('/dots/styles.css', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/dots/', 'styles.css'));
});

router.get('/tictactoe', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/tictactoe/', 'index.html'));
});

router.get('/tictactoe/index.js', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/tictactoe/', 'index.js'));
});

router.get('/tictactoe/styles.css', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/games/tictactoe/', 'styles.css'));
});

router.get('/intro-sample.mov', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../', 'intro-sample.mov'));
});

router.get('/main.js', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/main/', 'main.js'));
});

router.get('/main/styles.css', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/main/', 'styles.css'));
});

router.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../../src/main/', 'index.html'));
});

router.get('/dots/highscores', function (req, res) {

  _mongodb.MongoClient.connect(_devmongo2.default).then(function (connectedDb) {
    return connectedDb.collection('dots').find().toArray();
  }).then(function (result) {
    return res.send(result.sort(function (a, b) {
      return parseFloat(a.score) - parseFloat(b.score);
    }).reverse());
  }).catch(function (err) {
    return console.log('error while fetching currency data', err);
  });
});
router.post('/sign-up', function (req, res) {
  var body = req.body;


  _mongodb.MongoClient.connect(_devmongo2.default).then(function (connectedDb) {
    return connectedDb.collection('users').insert(body);
  }).then(function (result) {
    return res.send(result.ops[0]);
  }).catch(function (err) {
    return console.log('error while fetching currency data', err);
  });
});

router.post('/login', function (req, res) {
  var body = req.body;


  _mongodb.MongoClient.connect(_devmongo2.default).then(function (connectedDb) {
    return connectedDb.collection('users').findOne(body);
  }).then(function (result) {
    if (result && result._id) {
      res.send(result);
    } else {
      res.send({ error: 'incorrect username or password' });
    }
  }).catch(function (err) {
    return console.log('error while fetching currency data', err);
  });
});

router.post('/dots/highscore', function (req, res) {
  var body = req.body;


  _mongodb.MongoClient.connect(_devmongo2.default).then(function (connectedDb) {
    return connectedDb.collection('dots').insert(body);
  }).then(function (result) {
    return res.send(result.ops[0]);
  }).catch(function (err) {
    return console.log('error while fetching currency data', err);
  });
});

app.use(router);
app.listen(_port2.default);

process.on('SIGTERM', function (e) {
  return process.exit(0);
});