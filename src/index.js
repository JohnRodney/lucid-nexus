import express from 'express';
import port from './settings/port';
import path from 'path';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import devMongoURI from './settings/devmongo';

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/dots', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'index.html'));
});

router.get('/images/red-devil-skin.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'red-devil-skin.png'));
});

router.get('/images/blueface.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'blueface.png'));
});

router.get('/images/green-goat.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'green-goat.png'));
});

router.get('/dots/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'bundle.js'));
});

router.get('/dots/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'styles.css'));
});

router.get('/tictactoe', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/tictactoe/', 'index.html'));
});

router.get('/tictactoe/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/tictactoe/', 'index.js'));
});

router.get('/tictactoe/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/tictactoe/', 'styles.css'));
});

router.get('/intro-sample.mov', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'intro-sample.mov'));
});

router.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/main/', 'main.js'));
});

router.get('/main/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/main/', 'styles.css'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/main/', 'index.html'));
});

router.get('/dots/highscores', (req, res) => {

  MongoClient.connect(devMongoURI)
    .then((connectedDb) => connectedDb.collection('dots').find().toArray())
    .then(result => res.send(result.sort(function(a, b) {
    return parseFloat(a.score) - parseFloat(b.score);
}).reverse()))
    .catch(err => console.log('error while fetching currency data', err));
});
router.post('/sign-up', (req, res) => {
  const { body } = req;

  MongoClient.connect(devMongoURI)
    .then((connectedDb) => connectedDb.collection('users').insert(body))
    .then(result => res.send(result.ops[0]))
    .catch(err => console.log('error while fetching currency data', err));
});

router.post('/login', (req, res) => {
  const { body } = req;

  MongoClient.connect(devMongoURI)
    .then((connectedDb) => connectedDb.collection('users').findOne(body))
    .then(result => {
      if (result && result._id) {
        res.send(result)
      } else {
        res.send({ error: 'incorrect username or password' });
      }
    })
    .catch(err => console.log('error while fetching currency data', err));
});

router.post('/dots/highscore', (req, res) => {
  const { body } = req;

  MongoClient.connect(devMongoURI)
    .then((connectedDb) => connectedDb.collection('dots').insert(body))
    .then(result => res.send(result.ops[0]))
    .catch(err => console.log('error while fetching currency data', err));
});

app.use(router);
app.listen(port);

process.on('SIGTERM', e => process.exit(0));
