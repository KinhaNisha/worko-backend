const request = require('supertest');
const app = require('../app');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/dbConfig');
const dotenv = require('dotenv');


dotenv.config();

// Sample user data
const sampleUser = {
  email: 'newuser@example.com',
  name: 'New User',
  age: 25,
  city: 'New City',
  zipCode: '67890'
};


// Generate a valid token
const token = jwt.sign({ email: sampleUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

beforeAll(async () => {
  // Connect to the database
  await connectDB();
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('User API Routes', () => {

  it('POST /worko/user should create a new user and return a token', async () => {
    const res = await request(app)
      .post('/worko/user')
      .send(sampleUser)
      .expect(201);

    const { user, token } = res.body;

    expect(user.email).toBe(sampleUser.email);
    expect(user.name).toBe(sampleUser.name);
    expect(user.age).toBe(sampleUser.age);
    expect(user.city).toBe(sampleUser.city);
    expect(user.zipCode).toBe(sampleUser.zipCode);
    expect(user.isDeleted).toBe(false);
    expect(token).toBeDefined();
  });

  it('GET /worko/users should return all users', async () => {
    const res = await request(app)
      .get('/worko/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toEqual(expect.any(Array));
  });

  it('GET /worko/user/:userId should return user by ID', async () => {
    const user = await User.findOne({ email: sampleUser.email });

    const res = await request(app)
      .get(`/worko/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.email).toBe(sampleUser.email);
  });

  it('PUT /worko/user/:userId should update user by ID', async () => {
    const updatedData = { name: 'Updated User', age: 30 };
  });

  it('PATCH /worko/user/:userId should update user by ID', async () => {
    const updatedData = { city: 'Updated City' };
  });

  it('DELETE /worko/user/:userId should delete user by ID', async () => {
    const user = await User.findOne({ email: sampleUser.email });

    const res = await request(app)
      .delete(`/worko/user/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.isDeleted).toBe(true);
  });

});