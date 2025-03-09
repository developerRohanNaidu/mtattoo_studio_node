import express from "express";
import { login, noResponse } from "../controllers/authController.js";
import { loginValidationSchema } from "../validations/authValidation.js";
import validateRequest from "../middleware/validationMiddleware.js";
// import User from "../models/user.js";

const router = express.Router();

// Login Route
router.post("/login", validateRequest(loginValidationSchema), login);

// router.post("/add-super-admin", async (req, res) => {
//   try {
//     const { username, password, role } = req.body;

//     const user = new User({
//       username,
//       password,
//       role,
//     });

//     await user.save();

//     res.json(user);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get("/noresponse", noResponse);

export default router;
