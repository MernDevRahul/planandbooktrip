const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const Banner = require('../../modal/banner/banner');

// Helper function to ensure directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

// Handle the logo data and image upload
const addHomePageBanner = async (req, res) => {
try {
    const { title, description, bannerType } = req.body;
    const bannerImg = req.file ? req.file.path : null; // File path of the uploaded image

    if (!bannerImg) {
      return res.status(400).json({ error: 'Banner image is required' });
    }

    // Create a new banner document
    const newBanner = new Banner({
      title,
      description,
      bannerImg,
      bannerType,
    });

    // Save the banner to the database
    await newBanner.save();

    // Respond with the created banner
    res.status(201).json({
      message: 'Banner created successfully',
      banner: newBanner,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: 'Server error while creating banner' });
  }
};



// Get particular banner
const getBannerById = async (req, res) => {
  const bannerId = req.params.id;

  try {
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    return res.status(200).json({
      message: 'Banner fetched successfully',
      bannerData: banner,
    });
  } catch (error) {
    // console.error('Error fetching banner:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Edit particular banner
const editBannerById = async (req, res) => {
  const { id } = req.params;
  const { title, description,bannerType} = req.body;
  const bannerImg = req.file;

  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }   
    if (title) banner.title = title;
    if (description) banner.description = description;
    if(bannerType) banner.bannerType = bannerType;
    if (bannerImg) {
      const tempBannerPath = `temp_${bannerImg.path}`;
      ensureDirectoryExistence(tempBannerPath);
      await sharp(bannerImg.path)
        .resize(1200, 400) // Resize to 1200x400
        .toFile(tempBannerPath); // Save to temporary file
      fs.renameSync(tempBannerPath, bannerImg.path); // Move back to original path
      banner.bannerImg = bannerImg.path;
    }

    const updatedBanner = await banner.save();
    return res.status(200).json({
      message: 'Banner updated successfully',
      bannerData: updatedBanner,
    });
  } catch (error) {
    // console.error('Error updating banner:', error);
    return res.status(500).json({ message: 'Server error', error: error.message});
  }
};

// Get all banners
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    if (!banners || banners.length === 0) {
      return res.status(404).json({ message: 'No banners found' });
    }
    return res.status(200).json({
      message: 'Banners retrieved successfully',
      banners: banners
    });
  } catch (error) {
    // console.error('Error fetching banners:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete banner
const deleteBannerById = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    const imagePath = banner.bannerImg.replace(`${req.protocol}://${req.get('host')}/banners/`, '');
    const fullImagePath = path.join(__dirname, '..', '..', 'uploads', 'banners', imagePath);

    if (fs.existsSync(fullImagePath)) {
      fs.unlinkSync(fullImagePath); // Delete the image file
    }

    await Banner.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    // console.error('Error deleting banner:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addHomePageBanner,
  getAllBanners,
  getBannerById,
  editBannerById,
  deleteBannerById
};