import Joi from "joi";

const shopValidationSchema = Joi.object({
  shopName: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Shop name is required",
    "string.min": "Shop name must be at least 3 characters",
    "string.max": "Shop name cannot exceed 100 characters",
  }),

  location: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Location is required",
    "string.min": "Location must be at least 3 characters",
    "string.max": "Location cannot exceed 100 characters",
  }),

  city: Joi.string().min(3).max(100).required().messages({
    "string.empty": "City is required",
    "string.min": "City must be at least 3 characters",
    "string.max": "City cannot exceed 100 characters",
  }),
  state: Joi.string().min(2).max(100).required().messages({
    "string.empty": "State is required",
    "string.min": "State must be at least 3 characters",
    "string.max": "State cannot exceed 100 characters",
  }),
  country: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Country is required",
    "string.min": "Country must be at least 3 characters",
    "string.max": "Country cannot exceed 100 characters",
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
}).unknown(false);

export default shopValidationSchema;
