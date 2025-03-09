import Joi from "joi";

// Define a Joi schema for the ID
const idSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required(), // assuming MongoDB ObjectID
}).unknown(false);

export { idSchema };
