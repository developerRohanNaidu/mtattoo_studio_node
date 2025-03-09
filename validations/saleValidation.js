// validations/saleValidation.js
import Joi from "joi";

const saleValidationSchema = Joi.object({
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

  serviceIds: Joi.array()
    .items(
      Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId pattern
        .required()
        .messages({
          "string.pattern.base": "Service ID must be a valid ObjectId",
          "any.required": "Service ID is required",
        })
    )
    .required()
    .messages({
      "array.base": "Service IDs must be an array",
      "any.required": "Service IDs are required",
    }),

  amount: Joi.number().positive().precision(2).required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive value",
    "any.required": "Amount is required",
    "number.precision": "Amount can have up to 2 decimal places",
  }),

  shopId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId pattern
    .required()
    .messages({
      "string.pattern.base": "Shop ID must be a valid ObjectId",
      "any.required": "Shop ID is required",
    }),
}).unknown(false); // This ensures no extra fields are allowed

export default saleValidationSchema;
