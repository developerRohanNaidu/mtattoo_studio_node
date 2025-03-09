import { AuthorizationError } from "../utils/errorResponse.js";

// Middleware function to restrict access by role
const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // Assuming req.user is populated by JWT middleware

      // Check if the user's role is allowed
      if (!requiredRoles.includes(userRole)) {
        throw new AuthorizationError(
          "Access denied: Insufficient permissions."
        );
      }

      next(); // Proceed to the next middleware or route handler if authorized
    } catch (error) {
      console.log("error in roleMiddleware");
      return next(error);
    }
  };
};

export default roleMiddleware;
