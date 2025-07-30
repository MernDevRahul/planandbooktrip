// routes/ladakhBikeExpeditionRoutes.js

const express = require('express');
const router = express.Router();
const PackageController = require('../../controllers/tripPackageController/tripPackageController');
const {
    uploadFields,
    appendFilePathToFiles,
  } = require('../../config/multerConfig/packageImagesMulterConfig');
const { isAuthenticatedAdmin, isAuthenticatedSuperAdmin } = require('../../middleware/isAutheticated');
  

// Route to get all packages
router.get('/trip-packages/', PackageController.getAllPackages);

// Route to get a package by ID
router.get('/trip-packages/:id', PackageController.getPackageById);

// Route to get a package by slug
router.get('/trip-packages/slug/:slug', PackageController.getPackageBySlug);

// Route to create a new package
router.post('/trip-packages',isAuthenticatedAdmin,uploadFields,appendFilePathToFiles, PackageController.createPackage);

// Route to update a package by ID
router.put('/trip-packages/:id',isAuthenticatedAdmin,uploadFields,appendFilePathToFiles, PackageController.updatePackage);

// Route to delete a package by ID
router.delete('/trip-packages/:id',isAuthenticatedSuperAdmin, PackageController.deletePackage);

module.exports = router;
