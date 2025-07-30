const express = require("express");
const router = express.Router();
const subcategoryController = require("../../controllers/subCategoryControllers/subCategoryController");
const { isAuthenticatedAdmin,isAuthenticatedSuperAdmin } = require('../../middleware/isAutheticated'); // Correct import

router.post("/subcategories",isAuthenticatedAdmin, subcategoryController.createSubcategory);
router.get("/subcategories", subcategoryController.getAllSubcategories);
router.get("/subcategories/:id", subcategoryController.getSubcategoryById);
router.put("/subcategories/:id",isAuthenticatedAdmin, subcategoryController.updateSubcategory);
router.delete("/subcategories/:id",isAuthenticatedSuperAdmin, subcategoryController.deleteSubcategory);

module.exports = router;
