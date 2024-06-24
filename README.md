# Worko Backend

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm installed.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone [https://github.com/KinhaNisha/worko-backend.git]
    cd your-repository
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. Start the server:

    ```bash
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

### API Endpoints

#### Create User and Generate Token

- **URL:** `/temp-auth/create-user-and-token`
- **Method:** `POST`
- **Body:**

    ```json
    {
      "email": "test.user@example.com",
      "name": "Test User",
      "age": 30,
      "city": "Test City",
      "zipCode": "12345",
      "password": "password123"
    }
    ```

- **Response:**

    ```json
    {
        "user": {
            "email": "john.doe@example.com",
            "name": "John Doe",
            "age": 30,
            "city": "New York",
            "zipCode": "10001",
            "isDeleted": false,
            "_id": "667861ae28abdd2a43fed91f",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE5MTY1MzU4LCJleHAiOjE3MTkxNjg5NTh9.g259ZMZu9ot8Y7Yg3C7r-q4rV2BS-xbJqzEjLz6GY9E"
    }
    ```

#### Get User Details

- **URL:** `/worko/user/{id}`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer {token}`

- **Response:**

    ```json
    {
      "email": "test.user@example.com",
      "name": "Test User",
      "age": 30,
      "city": "Test City",
      "zipCode": "12345",
      "_id": "667861ae28abdd2a43fed91f"
    }
    ```

### Running Tests

1. Install the required testing dependencies:

    ```bash
    npm install --save-dev jest supertest jsonwebtoken
    ```

2. Run the tests:

    ```bash
    npm test
    ```

This will run the tests and generate a coverage report in the `coverage` directory.

### Example Test Files

#### `authController.test.js`

Ensure your test looks like this:

```javascript
// src/tests/authController.test.js

const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('Auth Controller', () => {
  it('should create a user and return a token', async () => {
    const response = await request(app)
      .post('/temp-auth/create-user-and-token')
      .send({
        email: 'test.user@example.com',
        name: 'Test User',
        age: 30,
        city: 'Test City',
        zipCode: '12345',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
  });
});
