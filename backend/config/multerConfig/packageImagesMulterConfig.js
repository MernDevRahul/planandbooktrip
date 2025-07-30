const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Generate a timestamp folder for the current request if not already created
    if (!req.uploadDirectory) {
      const timestamp = Date.now();
      req.uploadDirectory = path.join('uploads', 'packageImages', timestamp.toString());
      req.packageImageDirectory = path.join(req.uploadDirectory, 'packageImage');
      req.packageSubImagesDirectory = path.join(req.uploadDirectory, 'packageSubImages');

      // Create base directory and subdirectories
      fs.mkdirSync(req.uploadDirectory, { recursive: true });
      fs.mkdirSync(req.packageImageDirectory);
      fs.mkdirSync(req.packageSubImagesDirectory);
    }

    // console.log("req",req,"------------------","file",file)
    // Save files to respective directories based on fieldname
    if (file.fieldname === 'packageImage') {
      cb(null, req.packageImageDirectory);
    } else if (file.fieldname === 'packageSubImages') {
      cb(null, req.packageSubImagesDirectory);
    } else {
      cb(new Error('Invalid fieldname for image upload'), null);
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each file
    const uniqueName = `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});


// Multer configuration
const uploadImages = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific file types (e.g., images)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg','image/avif',`image/webp`];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only images are allowed (jpeg, png, gif ,webp ,gif)'));
    }
    cb(null, true);
  },
});

// Middleware for handling multiple file fields
const uploadFields = uploadImages.fields([
  { name: 'packageImage', maxCount: 1 }, // Single package image
  { name: 'packageSubImages', maxCount: 8 }, // Up to 8 sub-images
]);

// Middleware to append full URLs to files
const appendFilePathToFiles = (req, res, next) => {
  if (req.files) {
    if (req?.files?.packageImage) {
      req.files.packageImage = req.files.packageImage.map(file => ({
        ...file,
        path: file.path.replace(/\\/g, '/'), // Normalize slashes
      }));
    }
    if (req?.files?.packageSubImages) {
      req.files.packageSubImages = req.files.packageSubImages.map(file => ({
        ...file,
        path: file.path.replace(/\\/g, '/'), // Normalize slashes
      }));
    }
  }
  next();
};

module.exports = { uploadFields, appendFilePathToFiles };