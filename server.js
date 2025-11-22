const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const routeHandler = require('./src/routes');
const swaggerFile = require('./swagger_output.json');
const journeyTrackerRoutes = require('./src/routes/journeyTracker');

const app = express();

dotenv.config();
const { mongodbOptions } = require('./src/config');

const { PORT, HOST, MONGODB_URI } = process.env;

mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI, mongodbOptions)
  .then(() => console.log('Successfully connected to MongoDb'))
  .catch((e) => console.log('Could not connect to MongoDb', e));

app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/v1/', routeHandler);

app.use((req, res) => res.status(404).json({ error: 'We cannot get what you are looking for!' }));

app.listen(PORT, () => {
  console.log(`APP RUNNING ON ${HOST}:${PORT}`);
  console.log(`ACCESS API DOCS VIA ${HOST}:${PORT}/api-docs `);
});

app.use('/api/v1/journey-tracker', journeyTrackerRoutes);