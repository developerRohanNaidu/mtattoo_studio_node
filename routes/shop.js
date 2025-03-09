import express from "express";
import {
  addShop,
  ShopFetch,
  getAllShops,
  deleteShop,
} from "../controllers/shopController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validationMiddleware.js";
import shopValidationSchema from "../validations/shopValidation.js";

const router = express.Router();

router.post(
  "/",
  validateRequest(shopValidationSchema),
  roleMiddleware(["super-admin"]),
  addShop
);

router.post("/details", ShopFetch);

router.get("/", roleMiddleware(["super-admin"]), getAllShops);

// This will only soft delete the Shop
router.delete("/:id", deleteShop);

export default router;
