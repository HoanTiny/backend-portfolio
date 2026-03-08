const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         filename:
 *           type: string
 *         originalname:
 *           type: string
 *         mimetype:
 *           type: string
 *         size:
 *           type: number
 *         path:
 *           type: string
 *         uploadedBy:
 *           type: string
 *           description: User ObjectId
 *         createdAt:
 *           type: string
 *           format: date-time
 */
const mediaSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Media', mediaSchema);
