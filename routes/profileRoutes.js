const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Portfolio profile (singleton)
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get profile
 *     tags: [Profile]
 *     security: []
 *     responses:
 *       200:
 *         description: Profile data
 *   put:
 *     summary: Update profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.route('/').get(getProfile).put(protect, updateProfile);

module.exports = router;
