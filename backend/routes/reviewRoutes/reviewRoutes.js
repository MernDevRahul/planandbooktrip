const express = require("express");
const {
  createReview,
  getAllReviews,
  deleteAllReviews,
  updateReview,
  deleteSingleReview,
  getSingleReview,
} = require("../../controllers/reviewController/reviewControllers");

const router = express.Router();

// Route to create a new review (protected route)
router.post("/review", createReview);
router.put("/update:id", updateReview);
router.delete("/deleteAllReviews", deleteAllReviews);
router.get("/getAllReviews", getAllReviews);
router.get("/getSingleReview:id", getSingleReview);
router.delete("/deleteSingle:id", deleteSingleReview);

module.exports = router;
