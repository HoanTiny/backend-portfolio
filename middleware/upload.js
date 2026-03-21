const multer = require('multer');
const path = require('path');
const ApiError = require('../utils/ApiError');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Check if the file is a document
    const isDoc = file.originalname.match(/\.(pdf|doc|docx)$/i);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    
    // For raw media (like PDF), Cloudinary requires the extension in the public_id to serve it with the proper format.
    const public_id = isDoc ? `${nameWithoutExt}-${uniqueSuffix}${ext}` : `${nameWithoutExt}-${uniqueSuffix}`;

    return {
      folder: 'portfolio',
      resource_type: isDoc ? 'raw' : 'image', // Use 'raw' for docs to avoid Cloudinary PDF restriction (HTTP 401)
      public_id: public_id,
      // allowed_formats is only supported for 'image' and 'video'
      ...(isDoc ? {} : { allowed_formats: ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'] }),
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

module.exports = upload;
