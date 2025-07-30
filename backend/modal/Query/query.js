// models/query.js
const mongoose = require('mongoose');

// Define the Query Schema
const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  subject: {  
    type: String,
    default:"Query"
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Create the Query Model
const Query = mongoose.model('Query', querySchema);

module.exports = Query;
