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

router.get('/dots/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'bundle.js'));
});

router.get('/dots/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/games/dots/', 'styles.css'));
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

router.post('/sign-up', (req, res) => {
  const { body } = req;

  MongoClient.connect(devMongoURI)
    .then((connectedDb) => connectedDb.collection('users').insert(body))
    .then(result => res.send(result))
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

app.use(router);
app.listen(port);

process.on('SIGTERM', e => process.exit(0));
