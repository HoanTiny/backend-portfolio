const Media = require('../models/Media');
const ApiError = require('../utils/ApiError');
const { apiResponse, paginatedResponse } = require('../utils/apiResponse');
const fs = require('fs');
const path = require('path');

/**
 * @desc    Upload media
 * @route   POST /api/media/upload
 * @access  Private
 */
const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ApiError('Please upload a file', 400));
    }

    const media = await Media.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path.replace(/\\/g, '/'),
      uploadedBy: req.user.id,
    });

    apiResponse(res, 201, { media }, 'File uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all media
 * @route   GET /api/media
 * @access  Private
 */
const getMedia = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const total = await Media.countDocuments();
    const media = await Media.find()
      .populate('uploadedBy', 'username email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
    };

    paginatedResponse(res, 200, media, pagination);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single media
 * @route   GET /api/media/:id
 * @access  Private
 */
const getMediaById = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id).populate('uploadedBy', 'username email');
    if (!media) {
      return next(new ApiError('Media not found', 404));
    }
    apiResponse(res, 200, { media });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete media
 * @route   DELETE /api/media/:id
 * @access  Private/Admin
 */
const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return next(new ApiError('Media not found', 404));
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', media.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Media.findByIdAndDelete(req.params.id);

    apiResponse(res, 200, null, 'Media deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadMedia, getMedia, getMediaById, deleteMedia };
