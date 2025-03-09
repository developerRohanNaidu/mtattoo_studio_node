import Service from "../models/service.js";
import Shop from "../models/shop.js";
import { NotFoundError } from "../utils/errorResponse.js";
import nodemailer from 'nodemailer';
import twilio from 'twilio';
const accountSid = "AC920e72cd63ed4b581099b34872cfc64d";
const authToken = "c60725bfefa80de21e09d6d7d2397b72";
const client = twilio(accountSid, authToken);

export const addService = async (req, res, next) => {
  try {
    const { serviceName, description, price } = req.body;

    const service = new Service({
      serviceName,
      description,
      price,
      createdBy: req.user.userId,
    });
    await service.save();
    res.json({ message: "Service added successfully" });
  } catch (error) {
    return next(error);
  }
};

// FUTURE SCOPE FUNCTION
export const getServicesByShop = async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    // Find the shop and populate serviceIds with the createdBy field
    const shop = await Shop.findById(shopId).populate({
      path: "serviceIds", // Populate serviceIds
      populate: {
        path: "createdBy", // Nested population for createdBy within serviceIds
      },
    });

    if (!shop || shop.isDeleted) {
      throw new NotFoundError("Shop not found");
    }

    const services = shop.serviceIds.filter((service) => !service.isDeleted);

    res.json(services);
  } catch (error) {
    return next(error);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isDeleted: { $ne: true } }).populate(
      "createdBy"
    );
    if (!services) throw new NotFoundError("No shops are found");

    res.json(services);
  } catch (error) {
    return next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { serviceName, description, price } = req.body;

    const service = await Service.findByIdAndUpdate(id, {
      serviceName,
      description,
      price,
      updatedBy: req.user.userId, // Track who updated it
    }); // Return the updated document

    res.json({ message: "Service updated successfully" });
  } catch (error) {
    return next(error);
  }
};

export const deleteService = async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const service = await Service.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedBy: req.user.userId,
      deletedAt: new Date(),
      deleteReason: reason,
    });

    if (!service) {
      throw new NotFoundError("Service not found");
    }

    res.status(200).json({ message: "Service is deleted" });
  } catch (error) {
    next(error);
  }
};



// Send Message To User
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use any other email service
  auth: {
    user: 'your-email@gmail.com', // Your email address
    pass: 'your-email-password', // Your email password or app-specific password
  },
});





