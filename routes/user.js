import express from "express";
import {
  addAdmin,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Resource-based routes for managing admins

router.post("/", roleMiddleware(["super-admin"]), addAdmin); // Adds a new admin

router.get("/", roleMiddleware(["super-admin"]), getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", roleMiddleware(["super-admin"]), updateUser);

router.delete("/:id", roleMiddleware(["super-admin"]), deleteUser);

export default router;
