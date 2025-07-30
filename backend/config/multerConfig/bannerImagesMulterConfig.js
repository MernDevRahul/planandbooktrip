const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'bannerImage') {
      // For the banner image, save to the "uploads/banner" folder
      cb(null, 'uploads/banners/');
    } else {
      cb(new Error('Invalid file type'));
    }
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using the original file extension
    cb(null, Date.now() + path.extname(file.originalname)); // Timestamp + file extension to avoid filename collisions
  },
});

// Initialize multer with the storage configuration
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp|avif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

module.exports = upload;
