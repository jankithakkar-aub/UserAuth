const userServices = require("../services/userService");
const { ValidationError } = require("../utils/errorHandler");

//Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log("From controller", username, email);
    const newUser = await userServices.registerUser(username, email); // Call the registerUser function from the userServices module
    console.log("From controller", newUser);
    return res.status(201).json({
      // Return a 201 status code if the user is created successfully
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.statusCode).json({ error: error.message});
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

//Login a user and return a JWT token
exports.loginUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log("From controller login", username, email);
    const loginUser = await userServices.loginUser(username, email); // Call the loginUser function from the userServices module
    console.log("From controller login", loginUser);
    return res.status(200).json({
      // Return a 200 status code if the user is logged in successfully
      message: "User logged in successfully",
      user: {
        username: loginUser.username,
        email: loginUser.email,
      }
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
