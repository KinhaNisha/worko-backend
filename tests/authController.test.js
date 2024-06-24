// In tests/authController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Auth Controller', () => {
  it('should create a user and return a token', async () => {
    const response = await request(app)
      .post('/temp-auth/create-user-and-token')
      .send({
        email: 'test.user@example.com',
        name: 'Test User',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  }, 10000); // Increase timeout to 10 seconds
});

// Ensure mongoose connection is closed after tests
afterAll(async () => {
  await mongoose.connection.close();
});
