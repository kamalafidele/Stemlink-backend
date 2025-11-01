const dotenv = require('dotenv');

dotenv.config();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      description: 'StemLink API Documentation',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: process.env.SWAGGER_API_URL,
    basePath: '/',
    produces: ['application/json', 'application/xml'],
    schemes: [process.env.SWAGGER_PROTOCOL],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Place here your JWT token: Prefix with "Bearer YOUR_JWT_TOKEN" ',
      },
    },
  },
  basedir: __dirname, // app absolute path
  files: ['./src/routes/*.js'], // Path to the API handle folder
};

const mongodbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

module.exports = { swaggerOptions, mongodbOptions };
