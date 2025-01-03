class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent constructor with the message

    this.statusCode = statusCode || 500; // Set the status code to the statusCode parameter or 500 as default
    this.isOperational = true; // Set the isOperational property to true
    
    Error.captureStackTrace(this, this.constructor); // Capture the stack trace
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400); // Call the parent constructor with the message and 400 status code
  }
}

module.exports = {
  AppError,
  ValidationError,
};