class AppError extends Error {
  constructor(type, message, statusCode) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates if the error is operational or programming error
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 : The server couldn't understand the request due to invalid syntax or missing required parameters.
class ValidationError extends AppError {
  constructor(message) {
    super("ValidationError", message, 400);
  }
}

// 401 : Authentication is required, or the provided credentials are invalid.
class AuthenticationError extends AppError {
  constructor(message) {
    super("AuthenticationError", message, 401);
  }
}

// 403 : The server understands the request but refuses to authorize it (lack of permissions)
class AuthorizationError extends AppError {
  constructor(message) {
    super("AuthorizationError", message, 403);
  }
}

// 404 : The requested resource could not be found on the server.
class NotFoundError extends AppError {
  constructor(message) {
    super("NotFoundError", message, 404);
  }
}

// 409 : When trying to create or update a resource that already exists or has conflicting information
class ConflictError extends AppError {
  constructor(message) {
    super("ConflictError", message, 409);
  }
}

// 429 : The client has sent too many requests in a given amount of time.
class RateLimitError extends AppError {
  constructor(message) {
    super("RateLimitError", message, 429);
  }
}

// 500 : The server encountered an unexpected condition that prevented it from fulfilling the request.
class InternalServerError extends AppError {
  constructor(message) {
    super("InternalServerError", message, 500);
  }
}

// 503 : The server is temporarily unable to handle the request (usually due to maintenance or overloading).
class ServiceUnavailableError extends AppError {
  constructor(message) {
    super("ServiceUnavailableError", message, 503);
  }
}

export {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  InternalServerError,
  ServiceUnavailableError,
};
