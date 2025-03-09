// validations/customerValidation.js
import Joi from "joi";

const customerValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 1 character long",
    "string.max": "First name cannot exceed 100 characters",
  }),

  lastName: Joi.string().min(1).max(100).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 1 character long",
    "string.max": "Last name cannot exceed 100 characters",
  }),

  email: Joi.string().email().max(255).optional().messages({
    "string.email": "Email must be a valid email address",
    "string.max": "Email cannot exceed 255 characters",
  }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must contain only digits",
      "string.min": "Phone number must be at least 10 digits long",
      "string.max": "Phone number cannot exceed 15 digits",
    }),

  dateOfBirth: Joi.date().optional().messages({
    "date.base": "Date of birth must be a valid date",
  }),

  gender: Joi.string().valid("Male", "Female", "Other").optional().messages({
    "any.only": "Gender must be one of Male, Female, or Other",
  }),

  onboardedShopId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId pattern
    .required()
    .messages({
      "string.pattern.base": "Shop ID must be a valid ObjectId",
      "any.required": "Shop ID is required",
    }),
}).unknown(false);

export default customerValidationSchema;
