const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Review Schema
const ReviewSchema = new Schema(
  {
    package: {
      type: String,
      // Reference to the Product model
      required: true,
    },
    userName: {
      type: String,
    },
    user: {
      type: String, // Allows ObjectId, string, or any other type
      ref: "User", // Reference to User model, only applies if ObjectId is used
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating
      max: 5, // Maximum rating
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500, // Optional: limit comment length
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

// Create an index to ensure a user can leave only one review per product
// ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
