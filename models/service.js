import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
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
);

export default mongoose.model("Service", ServiceSchema);
