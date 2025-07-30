const Review = require("../../modal/review/review");

exports.createReview = async (req, res) => {
  try {
    const { packageId, userName, user, comment, rating } = req.body;

    // Validate required fields and check for profanity
    if (!packageId || !rating || !comment) {
      return res.status(400).json({
        message:
          "Package, comment, and rating are required or contain inappropriate words.",
      });
    }

    const newReview = new Review({
      package: packageId,
      userName,
      user,
      comment,
      rating,
    });

    await newReview.save(); // Save to database

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the review.",
      error: error.message,
    });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the reviews.",
      error: error.message,
    });
  }
};

exports.getSingleReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewData = await Review.findById(id);

    if (!reviewData) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ review: reviewData });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the review.",
      error: error.message,
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Ensures validation rules are applied
    });

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    res
      .status(200)
      .json({ message: "Review updated successfully.", review: updatedReview });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the review.",
      error: error.message,
    });
  }
};

exports.deleteSingleReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the review.",
      error: error.message,
    });
  }
};

exports.deleteAllReviews = async (req, res) => {
  try {
    await Review.deleteMany();
    res.status(200).json({ message: "All reviews deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the reviews.",
      error: error.message,
    });
  }
};
