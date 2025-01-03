const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../utils/errorHandler");

exports.registerUser = async (username, email) => {
  //Validate username
  console.log("username from service", username);
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new ValidationError(
      "Username cannot contain spaces or special characters"
    );
  }

  //Check if user already exists
  const existingUser = await userModel.getUserByUsername(username);
  if (existingUser) {
    throw new ValidationError("Username already exists");
  }

  console.log("email from service", email);
  //Validate email
  if (
    !email.includes("@") ||
    !email.includes(".") ||
    email.length < 5 ||
    email.length > 50 ||
    !/\S+@\S+\.\S+/.test(email)
  ) {
    throw new ValidationError("Invalid email");
  }

  const existingEmail = await userModel.getUserByUsernameAndEmail(
    username,
    email
  );
  if (existingEmail) {
    throw new ValidationError("Email already exists");
  }

  //Create new user in the database
  const newUser = await userModel.createUser(username, email);  
  console.log("new user from service", newUser);
  if (!newUser) {
    throw new Error("Failed to create user");
  }

  //Return the new user
  return newUser;
};

exports.loginUser = async (username, email) => {
  //Get user by username and email
  const user = await userModel.getUserByUsernameAndEmail(username, email);
  if (!user) {
    throw new ValidationError("User not found");
  }

  //Create a JWT token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    }, //Payload
    process.env.JWT_SECRET, //Secret key
    {
      expiresIn: "1h",
    } //Options
  );

  //Return the userdata and token
  return {
    username: user.username,
    email: user.email,
    token: token
  }
};
