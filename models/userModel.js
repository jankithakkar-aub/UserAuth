const client = require("../config/db");

// Get all users
async function createUser(username, email) {
  try {
    const result = await client.query(
      "INSERT INTO users(username, email) VALUES($1, $2) RETURNING *",
      [username, email] 
    );
    console.log("from model create user", result);
    return result.rows[0]; // Return the user that was inserted
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Get a user by username and email
async function getUserByUsernameAndEmail(username, email) {
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1 AND email = $2",
      [username, email]
    );
    console.log("from model find user by username and email", result);
    return result.rows[0]; // Return the user that was found
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Get a user by username
async function getUserByUsername(username) {
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    console.log("from model find user by username", result);
    return result.rows[0]; // Return the user that was found
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  createUser: createUser,
  getUserByUsernameAndEmail: getUserByUsernameAndEmail,
  getUserByUsername: getUserByUsername
}
