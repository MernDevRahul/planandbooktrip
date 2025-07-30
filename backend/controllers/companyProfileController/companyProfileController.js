const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const CompanyProfile = require('../../modal/companyProfile/companyprofile');

// Helper function to ensure directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

// Create a new company profile
exports.createCompanyProfile = async (req, res) => {
  try {
    let logoImage = req.files['logo_image'] ? req.files['logo_image'][0].path : null;
    let footerSubImages = req.files['footer_sub_images'] ? req.files['footer_sub_images'].map(file => file.path) : [];
console.log(footerSubImages)
    // Resize logo image
    if (logoImage) {
      const tempLogoPath = `temp_${logoImage}`;
      ensureDirectoryExistence(tempLogoPath);
      await sharp(logoImage)
        .resize(200, 200) // Resize to 200x200
        .toFile(tempLogoPath); // Save to temporary file
      fs.renameSync(tempLogoPath, logoImage); // Move back to original path
    }

    // Resize footer sub images
    for (let i = 0; i < footerSubImages.length; i++) {
      const tempFooterPath = `temp_${footerSubImages[i]}`;
      ensureDirectoryExistence(tempFooterPath);
      await sharp(footerSubImages[i])
        .resize(100, 100) // Resize to 100x100
        .toFile(tempFooterPath); // Save to temporary file
      fs.renameSync(tempFooterPath, footerSubImages[i]); // Move back to original path
    }

    const companyProfileData = {
      logo_image: logoImage,
      footer_sub_images: footerSubImages,
      phone_number: req.body.phone_number,
      email_id: req.body.email_id,
      company_description: req.body.company_description,
      social_media_links: {
        youtube: req.body.social_media_links_youtube || '',
        instagram: req.body.social_media_links_instagram || '',
        linkedin: req.body.social_media_links_linkedin || '',
        facebook: req.body.social_media_links_facebook || '',
      },
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        country: req.body.country
      }
    };

    const companyProfile = new CompanyProfile(companyProfileData);
    await companyProfile.save();
    res.status(201).json({
      message: 'Company profile created successfully!',
      companyProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating company profile', error });
  }
};

// Get all company profiles
exports.getCompanyProfiles = async (req, res) => {
  try {
    const companyProfiles = await CompanyProfile.find();
    res.status(200).json(companyProfiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company profiles', error });
  }
};

// Get a single company profile by ID
exports.getCompanyProfileById = async (req, res) => {
  try {
    const companyProfile = await CompanyProfile.findById(req.params.id);
    if (!companyProfile) {
      return res.status(404).json({ message: 'Company profile not found' });
    }
    res.status(200).json(companyProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company profile', error });
  }
};

// Update a company profile by ID
exports.updateCompanyProfile = async (req, res) => {
  try {
    let logoImage = req.files['logo_image'] ? req.files['logo_image'][0].path : null;
    let footerSubImages = req.files['footer_sub_images'] ? req.files['footer_sub_images'].map(file => file.path) : [];

    // Resize logo image
    if (logoImage) {
      const tempLogoPath = `temp_${logoImage}`;
      ensureDirectoryExistence(tempLogoPath);
      await sharp(logoImage)
        .resize(200, 200) // Resize to 200x200
        .toFile(tempLogoPath); // Save to temporary file
      fs.renameSync(tempLogoPath, logoImage); // Move back to original path
    }

    // Resize footer sub images
    for (let i = 0; i < footerSubImages.length; i++) {
      const tempFooterPath = `temp_${footerSubImages[i]}`;
      ensureDirectoryExistence(tempFooterPath);
      await sharp(footerSubImages[i])
        .resize(100, 100) // Resize to 100x100
        .toFile(tempFooterPath); // Save to temporary file
      fs.renameSync(tempFooterPath, footerSubImages[i]); // Move back to original path
    }

    const companyProfileData = {
      logo_image: logoImage,
      footer_sub_images: footerSubImages,
      phone_number: req.body.phone_number,
      email_id: req.body.email_id,
      company_description: req.body.company_description,
      social_media_links: {
        youtube: req.body.social_media_links_youtube || '',
        instagram: req.body.social_media_links_instagram || '',
        linkedin: req.body.social_media_links_linkedin || '',
        facebook: req.body.social_media_links_facebook || '',
      },
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
        country: req.body.country
      }
    };

    const companyProfile = await CompanyProfile.findByIdAndUpdate(
      req.params.id,
      companyProfileData,
      { new: true, runValidators: true }
    );
    if (!companyProfile) {
      return res.status(404).json({ message: 'Company profile not found' });
    }
    res.status(200).json({
      message: 'Company profile updated successfully',
      companyProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating company profile', error });
  }
};

// Delete a company profile by ID
exports.deleteCompanyProfile = async (req, res) => {
  try {
    const companyProfile = await CompanyProfile.findByIdAndDelete(req.params.id);
    if (!companyProfile) {
      return res.status(404).json({ message: 'Company profile not found' });
    }
    res.status(200).json({ message: 'Company profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting company profile', error });
  }
};
