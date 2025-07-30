const express = require('express');
const { 
  addHomePageBanner, 
  getBannerById, 
  getAllBanners, 
  editBannerById, 
  deleteBannerById 
} = require('../../controllers/bannerController/bannerControllers'); // Import controller
const upload = require('../../config/multerConfig/bannerImagesMulterConfig'); // Import multer configuration
const { isAuthenticatedAdmin, isAuthenticatedSuperAdmin } = require('../../middleware/isAutheticated');

const router = express.Router();

// Get all banners
router.get('/getAllBanners', getAllBanners);

// Get a specific banner by ID
router.get('/getBannerById/:id',isAuthenticatedAdmin, getBannerById);

// Add a new banner (POST request with image upload and data)
router.post(
  '/addBanner',
  upload.single('bannerImage'),
  isAuthenticatedAdmin,
  addHomePageBanner
);

// Edit an existing banner by ID
router.put(
  '/editBanner/:id',
  upload.single('bannerImage'),
  isAuthenticatedAdmin,
  editBannerById
);

// Delete a banner by ID
router.delete('/deleteBanner/:id',
  isAuthenticatedSuperAdmin,
  deleteBannerById
);

module.exports = router;