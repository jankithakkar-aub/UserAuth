# UserAuthentication

## Overview
This User Authentication Application allows users to register and login. The application is built using NodeJs, ExpressJs, JWT and includes a simple PostgreSQL database setup.

### Problem Statement

- **User Registration** API:
  - Username must be **unique**
  - Username must **not contain spaces or special characters**.
  - Returns appropriate success or faliure messages.

- **Login** API:
  - Users must provise their **username** and **email**.
  - Login should succeed if the username and email match an existing user.
  - Returns success or faliure messages with proper status.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Validation Rules](#validation-rules)
- [Technologies Used](#technologies-used)

---

## Installation

Follow the steps below to set up and run this project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) installed.

### Step 1: Clone the repository

```bash
git clone git@github.com:jankithakkar-aub/UserAuth.git
cd UserAuth
```

### Step 2: Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Step 3: Set up Environment Variables

Create a .env file in the root directory based on the .env.example file:

```bash
DB_HOST=localhost
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
PORT=3000
JWT_SECRET = your-secret-key
```

### Step 4: Set up PostgreSQL Database

Ensure you have a PostgreSQL database set up and create a database for the project:

```bash
sudo -i -u postgres;
psql;
CREATE DATABASE your-database-name;
```

Then, configure the .env file with the PostgreSQL connection details.

### Step 5: Run the application

Start the application by running:

```bash
npm start
```

The server will start running at http://localhost:3000

## Usage

### **API Endpoints**

#### **POST /api/users/register**

Registers a new user.

**Request body**:

```json
{
  "username": "newuser",
  "email": "newuser@example.com"
}
```

**Response**(on success):

```json
{
    "message": "User registered successfully",
    "user": {
        "username": "newuser",
        "email": "newuser@example.com"
    }
}
```

**Response**(on faliure-username already exists):

```json
{
    "error": "Username already exists"
}
```

#### **POST /api/users/login**

Logs in an user by matching username and email.

**Request body**:

```json
{
  "username": "existinguser",
  "email": "existinguser@example.com"
}
```

**Response**(on success):

```json
{
    "message": "User logged in successfully",
    "user": {
        "username": "existinguser",
        "email": "existinguser@example.com"
    }
}
```

### Explanation:

- **POST /api/users/register**: Registers a user with a username and email. If the username already exists or contains spaces/special characters, or if the email is invalid, it returns an error with an appropriate message.
- **POST /api/users/login**: Logs the user in by matching the username and email. If either doesn't match, it returns an error message.

This markdown will give users of your API a clear understanding of how to use the registration and login endpoints and what to expect as responses.

## Validation Rules

- **Username**:
  - Must be unique.
  - Cannot contain spaces or special characters.
  
- **Email**:
  - Must be a valid email address.
  
- **Registration**:
  - If a user tries to register with an already existing username, the request will fail with an appropriate error message.
  
- **Login**:
  - For login to be succeed, both username and email must match an existing user in the database.

## Technologies Used

This project uses the following technologies:

- **Node.js** — JavaScript runtime for building scalable server-side applications.
- **Express** — Web framework for Node.js for building the API.
- **PostgreSQL** — A powerful, open-source relational database management system.
- **Sequelize** — ORM to interact with the PostgreSQL database.
- **express-validator** — Middleware for validating and sanitizing request data.
- **dotenv** — To manage environment variables for sensitive data.
- **JWT (JSON Web Tokens)** — For user authentication and secure token-based sessions.
