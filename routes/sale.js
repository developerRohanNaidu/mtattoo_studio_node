import express from "express";
import validateRequest from "../middleware/validationMiddleware.js";
import saleValidationSchema from "../validations/saleValidation.js";
import {
  addSale,
  // getSalesByCustomer,
  getSales,
  deleteSale,
} from "../controllers/saleController.js";
import getQueryValidation from "../validations/getQueryValidation.js";
import { validateQuery } from "../middleware/validationMiddleware.js";
const router = express.Router();

// Add new sale for a customer
router.post("/add", validateRequest(saleValidationSchema), addSale);

// Get customers by onboarding duration
router.get("/", validateQuery(getQueryValidation), getSales);

// Get all sales by customer
// router.get("/customer/:customerId", getSalesByCustomer); // we are not using yet

// This will only soft delete the sale
router.delete("/:id", deleteSale);

export default router;
