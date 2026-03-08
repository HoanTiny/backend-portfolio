const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         avatar:
 *           type: string
 *         cvLink:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         skype:
 *           type: string
 *         socialLinks:
 *           type: object
 */
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    avatar: { type: String, default: '' },
    cvLink: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    skype: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
