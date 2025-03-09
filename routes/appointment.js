import express from "express";
import validateRequest from "../middleware/validationMiddleware.js";
import { validateQuery } from "../middleware/validationMiddleware.js";
import getQueryValidation from "../validations/getQueryValidation.js";
import {
  addAppointment,
  getAppointments,
} from "../controllers/appointments.js";
import appointmentValidation from "../validations/appointmentValidation.js";
import {
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointments.js";

const router = express.Router();

router.get("/", validateQuery(getQueryValidation), getAppointments);

router.post("/add", validateRequest(appointmentValidation), addAppointment);

router.put("/:id", validateRequest(appointmentValidation), updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;
