import Joi from "joi";

const appointmentValidationSchema = Joi.object({
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

  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date is required",
  }),

  shopId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId pattern
    .required()
    .messages({
      "string.pattern.base": "Shop ID must be a valid ObjectId",
      "any.required": "Shop ID is required",
    }),

  status: Joi.string()
    .valid("confirmed", "cancelled", "completed", "pending")
    .required()
    .messages({
      "any.only":
        'Status must be one of "confirmed", "cancelled", "completed" or "pending"',
      "any.required": "Status is required",
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
}).unknown(false); // This ensures no extra fields are allowed

export default appointmentValidationSchema;
