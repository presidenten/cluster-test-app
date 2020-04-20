const WebSocketServer = require('ws').Server;
const db = require('./db.js');

let wss;
let currentConnections = 0;
let websocketIsReady = false;

module.exports = {
  get ready() {
    return websocketIsReady;
  },

  get currentConnections() {
    return currentConnections;
  },

  init(server) {
    wss = new WebSocketServer({ server });

    wss.on('listening', () => {
      websocketIsReady = true;
    });

    wss.on('connection', function (ws) {
      db.addOneConnectionToCount();
      currentConnections = [...wss.clients].length;
      console.info('Current connections:', currentConnections);

      ws.on('close', (e) => {
        currentConnections = [...wss.clients].length;
        console.info('Current connections:', currentConnections);
      });

      setInterval(() => {
        if ([...wss.clients].length > 0) {
          ws.send(`${new Date().toISOString().replace(/^[^T]+T/g, '').slice (0,-5)}`);
        }
      }, 1000);
    });
  },

  prepareClose() {
    websocketIsReady = false;
  },

  close() {
    console.log('Closing websockets server');
    return new Promise((resolve) => {
      console.log('Websoockets server is closed');
      resolve();
    });
  },
};
