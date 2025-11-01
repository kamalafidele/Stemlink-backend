const { agent, createTestUser, createTestWallet } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(50000);

describe('POST auth/register', () => {
  it('should not work if email already exists', async () => {
    await createTestUser('john', 'doe', 'johndoe@gmail.com', 'JOHN_322_DOE');

    const response = await agent
      .post('/auth/register')
      .set('Accept', 'Application/json')
      .send({ firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com', password: '12hIOnadf30923' });

    expect(response.status).toEqual(400);
    expect(response.body.status).toEqual('Email Already Exist');
  });

  it('should not work if password length is less than 4', async () => {
    const response = await agent
      .post('/auth/register')
      .set('Accept', 'Application/json')
      .send({ firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com', password: '12h' });

    expect(response.status).toEqual(400);
  });

  // it('should work if all fields are provided', async () => {
  //   const response = await agent
  //     .post('/auth/register')
  //     .set('Accept', 'Application/json')
  //     .send({ firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com', password: '43590fmlasdfmlas904' });

  //   expect(response.status).toEqual(200);
  //   expect(response.body.status).toEqual('registered succefully');
  // });
});
