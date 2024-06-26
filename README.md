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
    git clone https://github.com/KinhaNisha/worko-backend.git
    cd worko-backend
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

- **URL:** `/worko/user`
- **Method:** `POST`
- **Body:**

    ```json
    {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 30,
        "city": "New York",
        "zipCode": "10001"
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

#### Get All Users

- **URL:** `/worko/users`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer {token}`

- **Response:**

    ```json
    [
    {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 30,
        "city": "New York",
        "zipCode": "10001",
        "_id": "667861ae28abdd2a43fed91f"
    }
    ]
    ```

#### Get User Details

- **URL:** `/worko/user/{userId}`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer {token}`

- **Response:**

    ```json
    {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 30,
        "city": "New York",
        "zipCode": "10001",
        "_id": "667861ae28abdd2a43fed91f"
    }
    ```

#### Update User

- **URL:** `/worko/user/{userId}`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Body:**

    ```json
    {
        "name": "Updated User",
        "age": 30
    }
    ```

- **Response:**

    ```json
    {
        "email": "john.doe@example.com",
        "name": "Updated User",
        "age": 30,
        "city": "New York",
        "zipCode": "10001",
        "isDeleted": false,
        "_id": "667861ae28abdd2a43fed91f",
        "__v": 0
    }
    ```

#### Partial Update User

- **URL:** `/worko/user/{userId}`
- **Method:** `PATCH`
- **Headers:**
  - `Authorization: Bearer {token}`
- **Body:**

    ```json
    {
        "city": "Updated City"
    }
    ```

- **Response:**

    ```json
    {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 30,
        "city": "Updated City",
        "zipCode": "10001",
        "isDeleted": false,
        "_id": "667861ae28abdd2a43fed91f",
        "__v": 0
    }
    ```

#### Delete User

- **URL:** `/worko/user/{userId}`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer {token}`

- **Response:**

    ```json
    {
        "email": "john.doe@example.com",
        "name": "John Doe",
        "age": 30,
        "city": "New York",
        "zipCode": "10001",
        "isDeleted": true,
        "_id": "667861ae28abdd2a43fed91f",
        "__v": 0
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

---