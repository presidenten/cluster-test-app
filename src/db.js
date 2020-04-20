const mongoose = require('mongoose');

let db;
let statisticsSchema;
let statisticsModel;
let statistics;

let dbIsReady = false;

module.exports = {
  get ready() {
    return dbIsReady;
  },

  get totalConnections() {
    return statistics.totalConnections;
  },

  init() {
    if (process.env.mongodb) {
      console.log('connecting to', `mongodb://${process.env.mongodb}/statistics`);
      mongoose.connect(`mongodb://${process.env.mongodb_user}:${process.env.mongodb_password}@${process.env.mongodb}/statistics`, {useNewUrlParser: true, useUnifiedTopology: true});
      db = mongoose.connection;
      db.once('open', async () => {
        console.info('');
        console.info('--------------');
        console.info(' DB connected ');
        console.info('--------------');
        console.info('');
        statisticsSchema = new mongoose.Schema({
          _id: Number,
          totalConnections: Number,
        });

        statisticsModel = mongoose.model('statistics', statisticsSchema)

        statistics = await statisticsModel.findById(1);

        if (!statistics) {
          statistics = await statisticsModel.create({ _id: 1, totalConnections: 0 });
        }

        dbIsReady = true;
      });
      db.on('error', () => dbIsReady = false );
    }
    else {
      console.log('Mocking db');
      dbIsReady = true
      statistics = {
        totalConnections: Math.round(Math.random()*40),
        save() {},
      };
      db = {
        close(_, fn) {fn()},
        addOneConnectionToCount() {},
      };
    }
  },

  addOneConnectionToCount() {
    if (statistics) {
      statistics.totalConnections++;
      statistics.save();
    }
  },

  close() {
    return new Promise((resolve) => {
      console.log('Closing mongodb connection');
      if (db) {
        db.close(false, () => {
          console.log('MongoDb connection closed');
          resolve();
        });
      } else {
        resolve();
      }
    });
  },
}
