const express = require('express');
const router = express.Router();
const companyProfileController = require('../../controllers/companyProfileController/companyProfileController');
const upload = require('../../config/multerConfig/profileandLogoUpdate');
const { isAuthenticatedAdmin,isAuthenticatedSuperAdmin } = require('../../middleware/isAutheticated');

// Create a new company profile
router.post('/company-profile',
    isAuthenticatedAdmin,
    upload.fields([
        { name: 'logo_image', maxCount: 1 },
        { name: 'footer_sub_images', maxCount: 6 }
    ]),
    companyProfileController.createCompanyProfile
);

// Get all company profiles
router.get('/company-profile', companyProfileController.getCompanyProfiles);

// Get a single company profile by ID
router.get('/company-profile/:id', companyProfileController.getCompanyProfileById);

// Update a company profile by ID
router.put('/company-profile/:id',
    isAuthenticatedAdmin,
    upload.fields([
        { name: 'logo_image', maxCount: 1 },
        { name: 'footer_sub_images', maxCount: 6 }
    ]),
     companyProfileController.updateCompanyProfile);

// Delete a company profile by ID
router.delete('/company-profile/:id', 
    isAuthenticatedSuperAdmin,
    companyProfileController.deleteCompanyProfile);

module.exports = router;
