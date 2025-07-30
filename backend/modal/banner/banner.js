const mongoose = require('mongoose');

// Define the Banner Schema
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bannerImg: {
    type: String,
    required: true,
  },
  bannerType: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the Banner Model
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;