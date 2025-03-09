import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    serviceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
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

export default mongoose.model("Shop", ShopSchema);
