// swagger.js
import swaggerAutogen from "swagger-autogen";
import convert from "joi-to-swagger";

// import authValidationSchema from "./validations/authValidation.js";
import customerValidationSchema from "./validations/customerValidation.js";
import saleValidationSchema from "./validations/saleValidation.js";
import serviceValidationSchema from "./validations/serviceValidation.js";
import shopValidationSchema from "./validations/shopValidation.js";
import appointmentValidationSchema from "./validations/appointmentValidation.js";

// Set up Swagger documentation information
const doc = {
  info: {
    title: "Your API",
    description: "Generated documentation",
  },
  host: `${"localhost:" + 4000}`,
  schemes: ["http"],
  // basePath: "/api", // Define the base path here
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter your bearer token in the format `Bearer <token>`",
    },
  },
  security: [{ bearerAuth: [] }],
};

// Convert each Joi schema
doc.definitions = {
  Customer: convert(customerValidationSchema).swagger,
  Sale: convert(saleValidationSchema).swagger,
  Service: convert(serviceValidationSchema).swagger,
  Shop: convert(shopValidationSchema).swagger,
  Appointment: convert(appointmentValidationSchema).swagger,
};

// Output file for Swagger documentation
const outputFile = "./swagger_output.json";
// List of your API routes
const endpointsFiles = ["./index.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully");
});
