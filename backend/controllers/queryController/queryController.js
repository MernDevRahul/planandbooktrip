const Query = require('../../modal/Query/query');

// Create a new query
exports.createQuery = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newQuery = new Query({
      name,
      email,
      phone,
      message,
    });

    const savedQuery = await newQuery.save();
    res.status(201).json(savedQuery);
  } catch (error) {
    res.status(500).json({ message: 'Error creating query', error: error.message });
  }
};

// Get all queries
exports.getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching queries', error: error.message });
  }
};

// Get a query by ID
exports.getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching query', error: error.message });
  }
};

// Update a query
exports.updateQuery = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const updatedQuery = await Query.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, message },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.status(200).json(updatedQuery);
  } catch (error) {
    res.status(500).json({ message: 'Error updating query', error: error.message });
  }
};

// Delete a query
exports.deleteQuery = async (req, res) => {
  try {
    const deletedQuery = await Query.findByIdAndDelete(req.params.id);
    if (!deletedQuery) {
      return res.status(404).json({ message: 'Query not found' });
    }
    res.status(200).json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting query', error: error.message });
  }
};
