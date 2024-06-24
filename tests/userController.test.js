// In tests/userController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('User Controller', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/temp-auth/create-user-and-token')
      .send({
        email: 'test.user@example.com',
        name: 'Test User',
        password: 'password123',
      });
    token = response.body.token;
  }, 10000); // Increase timeout to 10 seconds

  it('should get user details', async () => {
    const response = await request(app)
      .get('/worko/user-details')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', 'test.user@example.com');
  });
});

// Ensure mongoose connection is closed after tests
afterAll(async () => {
  await mongoose.connection.close();
});
