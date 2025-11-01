const { agent, createTestUser } = require('../../config/test-service');

jest.mock('request-promise-native');
jest.setTimeout(50000);

describe('POST /auth/login', () => {
  it('should fail if all fields are not provided', async () => {
    const response = await agent
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'johndoe@gmail.com' });

    expect(response.status).toEqual(400);
  });

  it('should fail if email is not valid', async () => {
    const response = await agent
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'johndoe_3434', password: '3fnalfnMKFKFIA2033' });

    expect(response.status).toEqual(400);
  });

  it('should login the user and return a jwt token', async () => {
    await createTestUser('john', 'doe', 'johndoe@gmail.com', 'JOHN_322_DOE');

    const response = await agent
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'johndoe@gmail.com', password: 'JOHN_322_DOE' });

    expect(response.status).toEqual(200);
    expect(response.body.jwt_token.length).toBeGreaterThan(50);
  });
});
