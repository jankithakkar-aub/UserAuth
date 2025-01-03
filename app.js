const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // Load environment variables from a .env file

const app = express();

app.use(express.json()); // Parse JSON bodies

app.use("/api/users", userRoutes); // Use the userRoutes module for any routes starting with /users

const PORT = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
