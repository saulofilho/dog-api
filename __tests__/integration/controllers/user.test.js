const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../../../src/app');

// const User = require('../../../src/app/models/User');
const factory = require('../factories');
const truncate = require('../../util/truncate');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '12345678',
    });

    const compareHash = bcrypt.compare('12345678', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app).post('/users').send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated emai', async () => {
    const user = await factory.attrs('User');

    await request(app).post('/users').send(user);

    const response = await request(app).post('/users').send(user);

    expect(response.status).toBe(400);
  });
});
