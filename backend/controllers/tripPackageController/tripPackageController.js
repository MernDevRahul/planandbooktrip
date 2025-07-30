// controllers/PackageController.js

const Package = require('../../modal/tripPackage/tripPackage');
const slugify = require('slugify');
const sharp = require('sharp');
const fs = require('fs');

// Helper function to resize images
const resizeImage = async (filePath, width, height) => {
  const resizedPath = filePath.replace(/(\.\w+)$/, '_resized$1');
  await sharp(filePath)
    .resize(width, height)
    .toFile(resizedPath);
  fs.unlinkSync(filePath); // Remove the original file
  return resizedPath;
};
  
// Create a new Ladakh Bike Expedition package
exports.createPackage = async (req, res) => {


  try {
    const {
      title,
      pickupLocation,
      dropLocation,
      numberOfDays,
      numberOfNights,
      overview,
      packagePrice,
      packagePromotional,
      isVisaFree,
      country,
      categoryId,
      subCategoryId,
      tripTagName,
      startingDate,
      isPickupAndDropAvailable,
      activityData,
    } = req.body;

    // Generate titleSlug
    const titleSlug = slugify(title, { lower: true, strict: true });

    // Check if slug already exists
    const existingPackage = await Package.findOne({ titleSlug });
    if (existingPackage) {
      return res.status(400).json({ message: 'A package with this title already exists' });
    }

    // Extract and resize image paths from req.files
    let packageImage = req.files?.packageImage?.[0]?.path || null;
    let packageSubImages = req.files?.packageSubImages?.map(file => file.path) || [];

    if (packageImage) {
      packageImage = await resizeImage(packageImage, 400, 400);
    }
    // if (packageSubImages.length > 0) {
    //   packageSubImages = await Promise.all(
    //     packageSubImages.map(async filePath => await resizeImage(filePath, 400, 400))
    //   );
    // }

    // Parse activityData if it's sent as a JSON string
    let parsedActivityData = [];
    if (typeof activityData === 'string') {
      try {
        parsedActivityData = JSON.parse(activityData);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid activityData format' });
      }
    } else if (Array.isArray(activityData)) {
      parsedActivityData = activityData;
    }

    const newPackage = new Package({
      title,
      titleSlug,
      pickupLocation,
      dropLocation,
      numberOfDays,
      numberOfNights,
      overview,
      packagePrice,
      packagePromotional,
      isVisaFree,
      country,
      categoryId,
      subCategoryId,
      tripTagName,
      startingDate: new Date(startingDate.trim()),
      isPickupAndDropAvailable: isPickupAndDropAvailable === 'true',
      activityData: parsedActivityData,
      packageImage,
      packageSubImages,
    });
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error creating package', error: err });
  }
};

// Get all Ladakh Bike Expedition packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('subCategoryId').populate('categoryId');
    res.status(200).json(packages);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching packages', error: err });
  }
};

// Get a specific Ladakh Bike Expedition package by ID
exports.getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(package);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching package', error: err });
  }
};
exports.getPackageBySlug = async (req, res) => {
  try {
    console.log('Received slug:', req.params.slug); // Debugging log
    const package = await Package.findOne({ titleSlug: req.params.slug });
    if (!package) {
      console.log('Package not found for slug:', req.params.slug); // Debugging log
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(package);
  } catch (err) {
    console.error('Error fetching package by slug:', err); // Debugging log
    res.status(400).json({ message: 'Error fetching package', error: err });
  }
};

// Update a specific Ladakh Bike Expedition package by ID
exports.updatePackage = async (req, res) => {
 
  try {
    const {
      title,
      pickupLocation,
      dropLocation,
      numberOfDays,
      numberOfNights,
      overview,
      packagePrice,
      packagePromotional,
      isVisaFree,
      country,
      categoryId,
      subCategoryId,
      tripTagName,
      startingDate,
      isPickupAndDropAvailable,
      activityData,
    } = req.body;

    // Generate titleSlug if title is updated
    let titleSlug;
    if (title) {
      titleSlug = slugify(title, { lower: true, strict: true });

      // Check if slug already exists for another package
      const existingPackage = await Package.findOne({ titleSlug, _id: { $ne: req.params.id } });
      if (existingPackage) {
        return res.status(400).json({ message: 'A package with this title already exists' });
      }
    }

    // Extract image paths from req.files
    let packageImage = req.files?.packageImage?.[0]?.path || null;
    let packageSubImages = req.files?.packageSubImages?.map(file => file.path) || [];

    // Resize images if provided
    if (packageImage) {
      packageImage = await resizeImage(packageImage, 400, 400);
    }

    // Parse activityData if it's sent as a JSON string
    let parsedActivityData = [];
    if (typeof activityData === 'string') {
      try {
        parsedActivityData = JSON.parse(activityData);
      } catch (err) {
        return res.status(400).json({ message: 'Invalid activityData format' });
      }
    } else if (Array.isArray(activityData)) {
      parsedActivityData = activityData;
    }

    // Fetch the existing package to preserve existing sub-images if no new ones are provided
    const existingPackage = await Package.findById(req.params.id);
    if (!existingPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Preserve existing sub-images if no new ones are provided
    if (packageSubImages.length === 0) {
      packageSubImages = existingPackage.packageSubImages;
    }

    // Prepare the updated package data
    const updatedData = {
      ...(title && { title }),
      ...(titleSlug && { titleSlug }),
      ...(pickupLocation && { pickupLocation }),
      ...(dropLocation && { dropLocation }),
      ...(numberOfDays && { numberOfDays }),
      ...(numberOfNights && { numberOfNights }),
      ...(overview && { overview }),
      ...(packagePrice && { packagePrice }),
      ...(packagePromotional && { packagePromotional }),
      ...(isVisaFree !== undefined && { isVisaFree: isVisaFree === 'true' }),
      ...(country && { country }),
      ...(categoryId && { categoryId }),
      ...(subCategoryId && { subCategoryId }),
      ...(tripTagName && { tripTagName }),
      ...(startingDate && { startingDate: new Date(startingDate.trim()) }),
      ...(isPickupAndDropAvailable !== undefined && { isPickupAndDropAvailable: isPickupAndDropAvailable === 'true' }),
      ...(parsedActivityData.length > 0 && { activityData: parsedActivityData }),
      ...(packageImage && { packageImage }), // Only update if a new image is provided
      ...(packageSubImages.length > 0 && { packageSubImages }), // Preserve or update sub-images
    };

    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: 'Error updating package', error: err });
  }
};

// Delete a specific Ladakh Bike Expedition package by ID
exports.deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting package', error: err });
  }
};










