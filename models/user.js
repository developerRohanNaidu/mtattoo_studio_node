import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "super-admin"],
      required: true,
    },
    // Admin can be linked to multiple shops; shopId is not required for super-admin
    shopIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
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

export default mongoose.model("User", UserSchema);
