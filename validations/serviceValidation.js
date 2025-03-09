import Joi from "joi";

const serviceValidationSchema = Joi.object({
  serviceName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Service name is required",
    "string.min": "Service name must be at least 3 characters",
    "string.max": "Service name cannot exceed 100 characters",
  }),

  description: Joi.string().max(500).allow(null, "").messages({
    "string.max": "Description cannot exceed 500 characters",
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive value",
    "any.required": "Price is required",
    "number.precision": "Price can have up to 2 decimal places",
  }),
}).unknown(false);

export default serviceValidationSchema;
