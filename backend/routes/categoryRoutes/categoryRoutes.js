const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
} = require('../../controllers/categoryControllers/categoryController');
const uploadCategoryImage = require('../../middleware/multer/categoryImageUploader');
const { isAuthenticatedAdmin,isAuthenticatedSuperAdmin } = require('../../middleware/isAutheticated'); // Correct import

const router = express.Router();

// Route to get all categories
router.get('/categories', getAllCategories);

// Route to get a category by ID
router.get('/categories/:Id', getCategoryById);

router.get('/categories/slug/:slug',getCategoryBySlug); // This route is for

// Route to create a new category with an image
router.post('/categories', isAuthenticatedAdmin, uploadCategoryImage.single('image'),isAuthenticatedAdmin,createCategory); // Ensure the field name matches

// Route to update a category by ID (with optional image update)
router.put('/categories/:Id',isAuthenticatedAdmin, uploadCategoryImage.single('image'),isAuthenticatedAdmin, updateCategory); // Ensure the field name matches

// Route to delete a category by ID
router.delete('/categories/:Id',isAuthenticatedSuperAdmin, deleteCategory);

module.exports = router;