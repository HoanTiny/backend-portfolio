const Post = require('../models/Post');
const User = require('../models/User');
const Category = require('../models/Category');
const Media = require('../models/Media');
const { apiResponse } = require('../utils/apiResponse');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard
 * @access  Private
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const [totalPosts, totalUsers, totalCategories, totalMedia, recentPosts, postsByStatus] =
      await Promise.all([
        Post.countDocuments(),
        User.countDocuments(),
        Category.countDocuments(),
        Media.countDocuments(),
        Post.find()
          .populate('author', 'username')
          .populate('category', 'name')
          .sort({ createdAt: -1 })
          .limit(5),
        Post.aggregate([
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

    apiResponse(res, 200, {
      stats: {
        totalPosts,
        totalUsers,
        totalCategories,
        totalMedia,
      },
      postsByStatus,
      recentPosts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
