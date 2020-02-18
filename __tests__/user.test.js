require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');
const Note = require('../lib/models/Note');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can signup a user', () => {
    return request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'testerman@test.com', password: '123456' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'testerman@test.com',
          __v: 0
        });
      });
  });

  it('can login a user', async() => {
    await User.create({ email: 'testerman@test.com', password: '123456' });
    return request(app)
      .post('/api/v1/users/login')
      .send({ email: 'testerman@test.com', password: '123456' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'testerman@test.com',
          __v: 0
        });
      });
  });

  it('fails when a bad email is used', async() => {
    await User.create({ email: 'testerman@test.com', password: '123456' });
    return request(app)
      .post('/api/v1/users/login')
      .send({ email: 'test@test.com', password: '123456' })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Email or Password',
          status: 401
        });
      });
  });

  it('fails when a bad password is used', async() => {
    await User.create({ email: 'testerman@test.com', password: '123456' });
    return request(app)
      .post('/api/v1/users/login')
      .send({ email: 'testerman@test.com', password: '1234' })
      .then(res => {
        expect(res.body).toEqual({
          message: 'Invalid Email or Password',
          status: 401
        });
      });
  });
});
