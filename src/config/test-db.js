const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();

  await mongoose
    .connect(mongoUri, opts)
    .then(() => console.log('test db connected'))
    .catch((e) => console.log('error: ', e));
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clear = async () => {
  const { collections } = mongoose.connection;

  // eslint-disable-next-line guard-for-in
  for (const key in collections) {
    const collection = collections[key];
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
};

module.exports = {
  connect,
  close,
  clear,
};
