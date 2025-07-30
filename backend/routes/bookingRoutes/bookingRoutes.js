const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/bookingControllers/bookingControllers");
const { isAuthenticatedAdmin, isAuthenticatedSuperAdmin } = require("../../middleware/isAutheticated");



router.post("/bookings",isAuthenticatedAdmin, bookingController.createBooking);
router.get("/bookings",isAuthenticatedAdmin, bookingController.getAllBookings);
router.get("/bookings/:id",isAuthenticatedAdmin, bookingController.getBookingById);
router.put("/bookings/:id",isAuthenticatedAdmin, bookingController.updateBooking);
router.delete("/bookings/:id",isAuthenticatedSuperAdmin, bookingController.deleteBooking);
module.exports = router;
