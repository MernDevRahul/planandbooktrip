
const Category = require('../../modal/category/category');
const Pagemeta=require('../../modal/pageMetaSchema/pageMetaSchema')
// Correct the import statement for slugify
const slugify = require('slugify');
// Controller function to get all categories
const getAllCategories = async (req, res) => {

  try {
    const categories = await Category.find().populate('subCategoryId');

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal server error',message:error.message });
  }
};

// Controller function to get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.Id).populate('subCategoryId');
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error getting category by ID:', error);
    res.status(500).json({ error: 'Internal server error',message:error.message });
  }
};
// Get a specific category by slug
const getCategoryBySlug = async (req, res) => {
  try {
    console.log('Received slug:', req.params.slug); // Debugging log
    const category = await Category.findOne({ slugName: req.params.slug }).populate('subCategoryId');
    if (!category) {
      console.log('Category not found for slug:', req.params.slug); // Debugging log
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    console.error('Error fetching category by slug:', err); // Debugging log
    res.status(400).json({ message: 'Error fetching category', error: err });
  }
};


// Controller function to create a new category
const createCategory = async (req, res) => {
  console.log(req.body)
  try {
    const { name, isVisibleOnNavbar } = req.body;

    const slugName = slugify(name, { lower: true });
    // Construct full image URL
    const imagePath = req.file
      ? req.file.path.replace(/\\/g, '/')
      : null;

    console.log(imagePath)
    // Create a new category instance
    const newCategory = new Category({
      name,
      slugName,
      isVisibleOnNavbar,
      image: imagePath, // Save the full image URL in the database
    });

    // Save category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error',message:error.message });
  }
};
// Controller function to update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { name, isVisibleOnNavbar } = req.body;

    // Check if a new image is uploaded and get the full URL
    const imagePath = req.file ? `/${req.file.path.replace(/\\/g, '/')}` : null; // Replace \ with / for cross-platform compatibility

    const slugName = slugify(name, { lower: true });
    // Build the update object dynamically
    const updateData = {};
    if (name) updateData.name = name;
    if(slugName) updateData.slugName = slugName
    if (isVisibleOnNavbar !== undefined) updateData.isVisibleOnNavbar = isVisibleOnNavbar === 'true';
    if (imagePath) updateData.image = imagePath; // Add image path only if a new image is uploaded

    // Find the category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(req.params.Id, updateData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error',message:error.message });
  }
};


// Controller function to delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.Id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error',message:error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBySlug
};