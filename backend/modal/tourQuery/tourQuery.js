const mongoose = require("mongoose");

const TourQuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
    tourName: {
        type: String,
        required: true,
        trim: true,
    },
    tourDate: {
        type: Date,
        required: true,
    },
    totalMembers: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("TourQuery", TourQuerySchema);
