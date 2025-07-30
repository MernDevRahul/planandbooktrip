// controllers/subcategoryController.js
const Category = require("../../modal/category/category");
const Subcategory = require("../../modal/subCategory/subCategory");
const slugify = require("slugify"); // Import slugify

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, isVisibleOnNavbar, categoryId } = req.body;

    // Generate slugName
    const slugName = slugify(name, { lower: true, strict: true });

    // Check if slugName already exists
    const existingSubcategory = await Subcategory.findOne({ slugName });
    if (existingSubcategory) {
      return res.status(400).json({ message: "A subcategory with this slug already exists" });
    }

    const newSubcategory = new Subcategory({ name, slugName, isVisibleOnNavbar, categoryId });
    await newSubcategory.save();
    await Category.findByIdAndUpdate(categoryId, { $push: { subCategoryId: newSubcategory._id } });
    console.log(newSubcategory);  
    res.status(200).json({newSubcategory,message:"Subcategory created successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("categoryId");
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate("categoryId");
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { name, isVisibleOnNavbar, categoryId } = req.body;

    // Generate slugName if name is updated
    let slugName;
    if (name) {
      slugName = slugify(name, { lower: true, strict: true });

      // Check if slugName already exists for another subcategory
      const existingSubcategory = await Subcategory.findOne({ slugName, _id: { $ne: req.params.id } });
      if (existingSubcategory) {
        return res.status(400).json({ message: "A subcategory with this slug already exists" });
      }
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name }), ...(slugName && { slugName }), isVisibleOnNavbar, categoryId },
      { new: true }
    );
    if (!updatedSubcategory) return res.status(404).json({ message: "Subcategory not found" });
    await Category.findByIdAndUpdate(categoryId, { $push: { subCategoryId: updatedSubcategory._id } });
    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deletedSubcategory) return res.status(404).json({ message: "Subcategory not found" });
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

