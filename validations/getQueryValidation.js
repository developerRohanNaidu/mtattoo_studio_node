import Joi from "joi";

const getQueryValidation = Joi.object({
  // TEMPORARY DISABLE THIS VALIDATION

  // startDate: Joi.date().iso().messages({
  //   "date.base": "Start date must be a valid date.",
  //   "date.iso": "Start date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).",
  // }),

  // endDate: Joi.date().iso().min(Joi.ref("startDate")).messages({
  //   "date.base": "End date must be a valid date.",
  //   "date.iso": "End date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).",
  //   "date.min": "End date must be greater than or equal to start date.",
  // }),

  shopId: Joi.string()
    .optional()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId pattern, if required
    .messages({
      "string.pattern.base": "Shop ID must be a valid MongoDB ObjectId.",
    }),
}).unknown(true);
// .with("endDate", "startDate") // Requires startDate if endDate is present
// .with("startDate", "endDate"); // Requires endDate if startDate is present
// .unknown(false);

export default getQueryValidation;
