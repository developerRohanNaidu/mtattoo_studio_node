import jwt from "jsonwebtoken";
import {
  ValidationError,
  AuthenticationError,
} from "../utils/errorResponse.js";

//  Middleware to protect routes
const jwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      throw new ValidationError("Token is not provided");
    }

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        throw new AuthenticationError("Invalid token.");
      }
      req.user = decoded; // this will pass to the api's req which are guarded with this middleware
      next();
    });
  } catch (error) {
    console.log("error in jwtMiddleware");
    return next(error);
  }
};

export default jwtMiddleware;
