import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Ensures case-insensitive email storage
    },
    password: {
      type: String,
      required: true,
    },
    creditBalance: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

// Prevent model re-registration in Next.js/serverless environments
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
