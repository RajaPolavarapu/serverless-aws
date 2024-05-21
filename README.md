# Serverless Authentication with MongoDB

This is a serverless application built with Node.js, Express, and MongoDB. It provides endpoints for user registration, login, and protected routes using JSON Web Tokens (JWT) for authentication. The application is designed to run on AWS Lambda using the Serverless Framework.

## Features

- User registration with MongoDB storage for usernames and hashed passwords.
- User login with JWT authentication.
- Protected routes for authenticated users.
- Local development environment setup with `serverless-offline`.

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm) (Node.js package manager)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for production deployment)
- [AWS CLI](https://aws.amazon.com/cli/) and AWS account (for deployment to AWS Lambda)

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd serverless-auth

# Install dependencies
npm install
```

## Configuration

1. Create a `.env` file in the root directory with the following environment variables:

   ```plaintext
   MONGO_USERNAME=your_mongodb_username
   MONGO_PASSWORD=your_mongodb_password
   ```

   Replace `your_mongodb_username` and `your_mongodb_password` with your MongoDB Atlas username and password.

2. Update the MongoDB connection URI in `db.js` to use the environment variables:

   ```javascript
   const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@your-mongodb-uri`;
   ```

   Replace `your-mongodb-uri` with your MongoDB connection URI.

## Usage

```bash
# Start the local server
npm start
```

Test the endpoints using tools like Postman or cURL:

- Register a new user: `POST /register`
- Login: `POST /login`
- Access protected routes: `GET /validate`
- Simple GET Route: `GET /hello`

## Deployment

To deploy the application to AWS Lambda, make sure you have configured the AWS CLI and have your AWS credentials set up. Then, run:

```bash
serverless deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
