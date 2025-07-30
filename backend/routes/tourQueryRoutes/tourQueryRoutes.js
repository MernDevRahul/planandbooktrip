const express = require("express");
const router = express.Router();
const {
    createTourQuery,
    getAllTourQueries,
    getTourQueryById,
    deleteTourQuery,
} = require("../../controllers/tourQueryController/tourQueryController");
const { isAuthenticatedAdmin, isAuthenticatedSuperAdmin } = require("../../middleware/isAutheticated");


// Route to create a new tour query
router.post("/tour-queries",createTourQuery);

// Route to get all tour queries
router.get("/tour-queries", getAllTourQueries);

// Route to get a single tour query by ID
router.get("/tour-queries/:id",isAuthenticatedAdmin, getTourQueryById);

// Route to delete a tour query by ID
router.delete("/tour-queries/:id",isAuthenticatedSuperAdmin, deleteTourQuery);

module.exports = router;
