import Appointment from "../models/appointment.js";
import { getDateRange } from "../utils/helpers.js";
import { NotFoundError } from "../utils/errorResponse.js";

export const addAppointment = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      date,
      shopId,
      status,
      phoneNumber,
      serviceIds,
    } = req.body;
    const appointment = new Appointment({
      firstName,
      lastName,
      date,
      shopId,
      status,
      phoneNumber,
      serviceIds,
      createdBy: req.user.userId,
    });

    await appointment.save();
    res.json({ message: "Appointment added successfully" });
  } catch (error) {
    console.log("errormer", error.message);
    return next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const { startDate, endDate, shopId } = req.query;
    const { startRange, endRange } = getDateRange(startDate, endDate);

    // Build the query object
    const query = {
      isDeleted: false,
    };

    // Add date range filter to the query if both startDate and endDate are provided
    if (startRange && endRange) {
      query.createdAt = {
        $gte: new Date(startRange),
        $lte: new Date(endRange),
      };
    }

    // If shopId is provided, add it to the query
    if (shopId) {
      query.shopId = shopId;
    }

    const appointments = await Appointment.find(query)
      .populate("createdBy")
      .populate("shopId")
      .populate("serviceIds");

    res.json(appointments.length ? appointments : []);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params; // Appointment ID from the URL
    const {
      firstName,
      lastName,
      date,
      shopId,
      status,
      phoneNumber,
      serviceIds,
    } = req.body;

    // Find the appointment and update fields
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        date,
        shopId,
        status,
        phoneNumber,
        serviceIds,
        updatedBy: req.user.userId, // Track who updated it
      },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      throw new NotFoundError("Appointment not found");
    }

    res.json({
      message: "Appointment updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const deletedAppointment = await Appointment.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date(),
      deleteReason: reason,
    });

    if (!deletedAppointment) {
      throw new NotFoundError("Appointment not found");
    }

    res.status(200).json({ message: "Appointment permanently deleted" });
  } catch (error) {
    return next(error);
  }
};
