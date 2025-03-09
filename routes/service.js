import express from "express";
import {
  addService,
  getServicesByShop,
  getAllServices,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import validateRequest from "../middleware/validationMiddleware.js";
import serviceValidationSchema from "../validations/serviceValidation.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Add new service
router.post(
  "/add",
  validateRequest(serviceValidationSchema),
  roleMiddleware(["super-admin"]),
  addService
);

// Get all services
router.get("/", roleMiddleware(["super-admin"]), getAllServices);

// Get all services by shop
router.get("/shop/:shopId", getServicesByShop);

// update service
router.put(
  "/:id",
  validateRequest(serviceValidationSchema),
  roleMiddleware(["super-admin"]),
  updateService
);

router.delete("/:id", roleMiddleware(["super-admin"]), deleteService);


export default router;
