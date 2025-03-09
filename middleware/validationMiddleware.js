// Joi allows you to validate inputs on the route level, handling errors before they interact with the database.
//  Set up schemas separately to ensure the request body is checked early.
// Catch Joi errors and respond with meaningful messages before reaching Mongoose.
import { ValidationError } from "../utils/errorResponse.js";

const validateRequest = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message); // This error will be caught by the catch block
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log("error in validateRequest");
    return next(error); // Pass the error to the next middleware or error handler
  }
};

// Middleware to validate query parameters
export const validateQuery = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.query);
    if (error) {
      throw new ValidationError(error.details[0].message); // This error will be caught by the catch block
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log("error in validateQuery");
    return next(error); // Pass the error to the next middleware or error handler
  }
};

// Middleware to validate query parameters
export const validateParams = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.params);
    if (error) {
      throw new ValidationError(error.details[0].message); // This error will be caught by the catch block
    }
    next(); // Proceed to the next middleware
  } catch (error) {
    console.log("error in validateParams");
    return next(error); // Pass the error to the next middleware or error handler
  }
};

export default validateRequest;
