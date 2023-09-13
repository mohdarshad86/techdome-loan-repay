Admin Login Details:

Email : techdome@gmail.com
Password : techdome123

DEPLOYED APPLICATION : Successfully deployed the application on netlify

```bash
https://lone-repayments.netlify.app/
```

Clone the repository: To clone the repository run below command in the terminal

```bash 
git clone https://github.com/mohdarshad86/techdome-loan-repay.git
```

User can run the application using dev command, it run both frontend and backend simultaneously from main directory ( i.e. techdome-loan-repayment ).

run command 
```bash
npm install
```
It will install `concurrently` and then run
```bash
npm run dev
```
This command will start both the frontend and backend simultaneously.

For the detailed explanation to setup both the frontend and backend, please refer to the sections below.

# BACKEND:

Techdome Solution Assignment - Loan Repayment App.
The server directory is the backend for a Loan Repayment App, providing RESTful APIs for user registration, login, loan management, OTP verification, and more. It is built using the Express.js framework and follows best practices for routing and middleware usage.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Middleware](#middlewares)

## Features
- User registration and login.
- User authentication and authorization using JSON Web Tokens (JWT).
- OTP (One-Time Password) verification for enhanced security.
- Loan creation, approval, and repayment management.
- Retrieve loans for specific users or all users.

## Getting Started
To run this backend as seperate on your local development environment, follow these steps:

1. You have already cloned the repository now navigate to the 'server' directory using the ```cd server``` command.

2. Install dependencies:
```npm install```.
It will install all the necessary dependencies

3. Configure environment variables by creating a .env file and adding the required configuration.

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
- PUT /api/loan/approve/:loanId: Approve a loan by loan ID (requires authentication).
- POST /api/loan/repay/:loanId: Add a repayment for a loan by loan ID (requires authentication).
- GET /api/loan/user: Get loans for the authenticated user.
- GET /api/loan/allUser: Get all loans for all users (requires authentication).
- Invalid URL : All other routes will return a 400 Bad Request response with the message "Invalid URL."

### Middlewares
- authMiddleware: Authentication middleware using JWT for protected routes.
- otpVerification.sendOTP: Middleware for sending OTP to users.
- otpVerification.verifyOTP: Middleware for OTP verification.

## Usage
This backend serves to build a frontend application that allows users to register, log in, apply for loans, approve loans, and manage loan repayments. I have Secure the frontend application by integrating JWT for user authentication and authorization.

# FRONTEND

Techdome Solution Assignment - Loan Repayment App.
The client directory is the frontend of the Loan Repayment App. This frontend application is built to interact with the corresponding backend server to provide users with a user-friendly interface for managing loans, user accounts, and Loan Applications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Features

- User registration and login.
- Admin friendly dashboard for loan management.
- Customer can Apply for loans, view loan status, and make repayments.

## Getting Started

To get started with this frontend application, follow these steps:

1. Navigate to the fronened directory:

   ```bash
   cd client
2. Install necessary dependencies
   ```bash 
   npm install
3. Run Frontend
   ```bash 
   npm start
# Usage Guide

This guide provides instructions on how to use the frontend application to manage loans, user accounts

## User Registration

1. Click on the "SignUp" Tab on the Homepage.
2. Fill out the registration form with your details.
3. Click "SignUp" button to create a new user account.

## User Login

1. Click on the "Login" Tab on the Homepage.
2. Enter your login credentials (Mobile Number or username and password).
3. Click "Login" to verify and access your account.

## Loan Application

1. Once logged in, Customer can see status of their loan applications and can apply for a loan.
2. Fill out the loan application form with the required information.
3. Click "Apply" to apply for a loan.

## View Loan Status

1. Admin On the dashboard can view the status of all the users loan applications.
2. Check and approve the pending Loans.

## Loan Repayments

1. Once loan is approved, Customer can make repayments..
2. Follow the prompts to make secure loan repayments and click Pay Now to pay the amount.

Ensure that the corresponding backend server is also running to handle API requests.