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
  email: 'test@example.com',
  name: 'Test User',
  age: 30,
  city: 'Test City',
  zipCode: '12345'
};

// Generate a valid token
const token = jwt.sign({ email: sampleUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

beforeAll(async () => {
  // Connect to the database
  await connectDB();

  // Create a sample user in the database
  await User.create(sampleUser);
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

// describe('User API Routes', () => {

//   it('GET /worko/users should return all users', async () => {
//     const res = await request(app)
//       .get('/worko/users')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body).toEqual(expect.any(Array));
//   });

//   it('GET /worko/user/:userId should return user by ID', async () => {
//     const user = await User.findOne({ email: sampleUser.email });

//     const res = await request(app)
//       .get(`/worko/user/${user._id}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(res.body.email).toBe(sampleUser.email);
//   });

  
  // it('POST /worko/user should create a new user and return a token', async () => {
  //   const res = await request(app)
  //     .post('/worko/user')
  //     .send(sampleUser)
  //     .expect(201);

    // const { user, token } = res.body;

    // expect(user).toBe(user);
    // expect(token).toBeDefined(token);
  // });

  // it('PUT /worko/user/:userId should update an existing user', async () => {
  //   const user = await User.findOne({ email: 'diana1@example.com' });

  //   const updatedUser = {
  //     email: 'updated@example.com',
  //     name: 'Updated User',
  //     age: 35,
  //     city: 'Updated City',
  //     zipCode: '54321'
  //   };

    // const res = await request(app)
    //   .put(`/worko/user/$667b08c40520ee4047c75cb2`)
    //   .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpYW5hMUBleGFtcGxlLmNvbSIsImlhdCI6MTcxOTMzOTIwNSwiZXhwIjoxNzE5MzQyODA1fQ.AOQDV8eRXPeB1WD9iKIMCkM-i6Vwfte2F4XWgbF1wvI`)
    //   .send(updatedUser)
    //   .expect(500);

    // expect(res.body.email).toBe(updatedUser.email);
  // });

  // it('PATCH /worko/user/:userId should partially update an existing user', async () => {
  //   const user = await User.findOne({ email: sampleUser.email });

  //   const updatedUser = {
  //     name: 'Patched User',
  //   };

  //   const res = await request(app)
  //     .patch(`/worko/user/${user._id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(updatedUser)
  //     .expect(200);

  //   expect(res.body.name).toBe(updatedUser.name);
  // });

  // it('DELETE /worko/user/:userId should soft delete a user', async () => {
  //   const user = await User.findOne({ email: sampleUser.email });

  //   await request(app)
  //     .delete(`/worko/user/${user._id}`)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200);

  //   const deletedUser = await User.findById(user._id);
  //   expect(deletedUser).toBeNull();
  // });
// });

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
});