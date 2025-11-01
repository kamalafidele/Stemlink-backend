const doc = {
  info: {
    version: '1.0.0',
    title: 'StemLink apis',
    description: 'StemLink backend apis documentation',
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'User authentication and authorization',
    },
  ],
  definitions: {
    User: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'john@123',
    },
  },
};
module.exports = doc;
