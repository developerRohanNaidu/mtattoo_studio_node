import express from "express";
import {
  addCustomer,
  // getCustomerById,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import validateRequest, {
  validateParams,
} from "../middleware/validationMiddleware.js";
import { validateQuery } from "../middleware/validationMiddleware.js";
import getQueryValidation from "../validations/getQueryValidation.js";
import customerValidationSchema from "../validations/customerValidation.js";
import { idSchema } from "../validations/paramsValidation.js.js";

const router = express.Router();

// Add a new customer
router.post("/add", validateRequest(customerValidationSchema), addCustomer);

// Get all customer
router.get("/", validateQuery(getQueryValidation), getCustomers);

// Get customer by ID
// router.get("/:id", validateParams(idSchema), getCustomerById); // not using yet

router.put("/:id", validateRequest(customerValidationSchema), updateCustomer);

// soft delete
router.delete("/:id", deleteCustomer);

export default router;
