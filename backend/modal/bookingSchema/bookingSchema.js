const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  BookingDestination: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String,  },
  phone: { type: String, required: true },
  numberOfChildren: { type: Number, },
  numberOfAdults: { type: Number, required: true },
  numberOfChildrenWithBeds: { type: Number,},
  numberOfAdultsWithBeds: { type: Number, required: true },
  checkinDate: { type: Date, required: true },
  checkoutDate: { type: Date, required: true },
  salePrice: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  message: { type: String },
  confirmBookingType: { type: String, enum: ["domestic", "international"], required: true },
  profitOrLoss: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
