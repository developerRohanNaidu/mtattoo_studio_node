import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    serviceIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
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

export default mongoose.model("Sale", SaleSchema);
