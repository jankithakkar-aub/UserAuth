const { Client } = require("pg"); // Import Client from pg

require("dotenv").config(); // Load environment variables from a .env file

const client = new Client({
  connectionString: process.env.POSTGRES_DATABASE_URL, // Connection string
});

client
  .connect() // Connect to the database
  .then(function () {
    console.log("Connected to database");
  })
  .catch(function (err) {
    console.log("Error connecting to database", err);
  });

module.exports = client; // Export the client
