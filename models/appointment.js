import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      // unique: true, // comment out bcs if multiple appointment can exist for same msisdn for diff. dates
    },
    serviceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "canceled", "completed", "pending"], // need to check jou validation
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, required: false },
    deleteReason: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
); // time stamp need to check

export default mongoose.model("Appointment", AppointmentSchema);
