const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routeHandler = require('./src/routes');

module.exports = () => {
  const app = express();

  dotenv.config();
  const { mongodbOptions } = require('./src/config');

  const { MONGODB_URI } = process.env;

  mongoose.set('strictQuery', false);

  mongoose
    .connect(MONGODB_URI, mongodbOptions)
    .then(() => console.log('Successfully connected to MongoDb'))
    .catch((e) => console.log('Could not connect to MongoDb', e));

  app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
  app.use(express.json({ limit: '50mb', extended: true }));
  app.use(
    cors({
      origin: '*',
      credentials: true,
    })
  );

  app.use('/', routeHandler);

  return app;
};
