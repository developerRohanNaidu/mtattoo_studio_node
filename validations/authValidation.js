// validations/loginValidation.js
import Joi from "joi";

export const loginValidationSchema = Joi.object({
  username: Joi.string().max(50).min(3).required().messages({
    "string.empty": "Username is required",
    "string.max": "Username cannot exceed 50 characters",
    "string.min": "Username must be at least 3 character long",
  }),

  password: Joi.string().max(100).min(4).required().messages({
    "string.empty": "Password is required",
    "string.max": "Password cannot exceed 100 characters",
    "string.min": "Password must be at least 4 character long",
  }),
}).unknown(false);
