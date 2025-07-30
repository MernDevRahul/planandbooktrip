const TourQuery = require("../../modal/tourQuery/tourQuery");

// Create a new tour query
exports.createTourQuery = async (req, res) => {
    try {
        const { name, email, phone, message, tourName, tourDate, totalMembers } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !tourName || !tourDate || !totalMembers) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        const newQuery = new TourQuery({
            name,
            email,
            phone,
            message,
            tourName,
            tourDate,
            totalMembers,
        });

        const savedQuery = await newQuery.save();
        res.status(201).json({ success: true, data: savedQuery });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Get all tour queries
exports.getAllTourQueries = async (req, res) => {
    try {
        const queries = await TourQuery.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: queries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Get a single tour query by ID
exports.getTourQueryById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = await TourQuery.findById(id);

        if (!query) {
            return res.status(404).json({ error: "Tour query not found." });
        }

        res.status(200).json({ success: true, data: query });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};

// Delete a tour query by ID
exports.deleteTourQuery = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuery = await TourQuery.findByIdAndDelete(id);

        if (!deletedQuery) {
            return res.status(404).json({ error: "Tour query not found." });
        }

        res.status(200).json({ success: true, message: "Tour query deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};
