# Clone the repository:

Clone the repository using command

```git clone https://github.com/mohdarshad86/techdome-loan-repay.git```

# BACKEND:

Techdome Solution Assignment - Loan Repayment App.
The server is the backend for a Loan Repayment App, providing RESTful APIs for user registration, login, loan management, OTP verification, and more. It is built using the Express.js framework and follows best practices for routing and middleware usage.

## Table of Contents
- Features
- Getting Started
- API Endpoints
- Middleware
- Usage

## Features
- User registration and login.
- User authentication and authorization using JSON Web Tokens (JWT).
- OTP (One-Time Password) verification for enhanced security.
- Loan creation, approval, and repayment management.
- Retrieve loans for specific users or all users.

## Getting Started
To run this backend as seperate on your local development environment, follow these steps:

1. You have already cloned the repository now navigate to the 'server' directory using the ```cd server``` command.

2. Install dependencies: run command

     ```npm install```

It will install all the necessary dependencies

3. Configure environment variables by creating a ```.env``` file and adding the required configuration.
It consist ```MONGO_URI```, ```PORT``` and ```SECRET_KEY```.

4. Start the server: run command

    ```npm start```

The server will be running on http://localhost:3001 by default.

## API Endpoints
The backend server provides the following API endpoints:

### User Management

- POST /api/user: Register a new user.
- POST /api/user/login: User login.
- GET /api/users: Get a list of - all users (requires authentication).

### OTP Verification

- POST /api/user/sendOTP: Send OTP for user verification.
- POST /api/user/verifyOTP: Verify user OTP.

### Loan Management

- POST /api/loan/create: Create a new loan (requires authentication).
- PUT /api/loan/approve/:loanId: Admin can Approve a loan by loan ID (requires authentication).
- POST /api/loan/repay/:loanId: Add a repayment for a loan by loan ID (requires authentication).
- GET /api/loan/user: Get loans for the authenticated user.
- GET /api/loan/allUser: Admin can get all loans for all users (requires authentication).

### Invalid URL :
All other routes will return a 400 Bad Request response with the message "Invalid URL."

### Middlewares
- authMiddleware: Authentication middleware using JWT for protected routes.
- otpVerification.sendOTP: Middleware for sending OTP to users.
- otpVerification.verifyOTP: Middleware for OTP verification.

## Usage
This backend serves to build the Loan Repayment application frontend that allows users to register, log in, apply for loans, approve loans, and manage loan repayments. I have Secure the frontend application by integrating JWT for user authentication and authorization.