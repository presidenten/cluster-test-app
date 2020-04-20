
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const STATUS = require('http-status-codes'); // https://www.npmjs.com/package/http-status-codes#codes

const db = require('./db.js');
const wss = require('./wss.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;
const basepath = process.env.basepath || ''
const server = app.listen(port);
let isReady = () => db.ready && wss.ready;

wss.init(server, basepath);
db.init();


app.get(basepath + '/', function (req, res) {
  if (isReady()) {
    res.status(STATUS.OK).render(__dirname + '/views/index.ejs', {
      connections: db.totalConnections + 1,
    });
  }
  else {
    res.status(STATUS.SERVICE_UNAVAILABLE).send({ status: 'Unavailable' });
  }
});

app.get(basepath + '/health', function (req, res) {
  if (isReady()) {
    res.status(STATUS.OK).send({ status: 'OK' });
  }
  else {
    res.status(STATUS.SERVICE_UNAVAILABLE).send({ status: 'Unavailable' });
  }
});


process.on('SIGTERM', () => {
  console.info('\n-- Received SIGTERM --\n');
  wss.prepareClose();
  console.info('Current connections:', wss.currentConnections);
  const waitForNoConnections = setInterval(async () => {
    if (wss.currentConnections === 0) {
      clearInterval(waitForNoConnections);

      await db.close();
      await wss.close();

      process.exit(0);
    }
  }, 1000);
});
