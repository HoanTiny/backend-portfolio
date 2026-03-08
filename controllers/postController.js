const Post = require('../models/Post');
const ApiError = require('../utils/ApiError');
const { apiResponse, paginatedResponse } = require('../utils/apiResponse');

/**
 * @desc    Get all posts (with pagination & search)
 * @route   GET /api/posts
 * @access  Public
 */
const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};

    // Search by title
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }

    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filter by tag
    if (req.query.tag) {
      filter.tags = { $in: [req.query.tag] };
    }

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'username email avatar')
      .populate('category', 'name slug')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
    };

    paginatedResponse(res, 200, posts, pagination);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single post
 * @route   GET /api/posts/:id
 * @access  Public
 */
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email avatar')
      .populate('category', 'name slug');

    if (!post) {
      return next(new ApiError('Post not found', 404));
    }

    apiResponse(res, 200, { post });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res, next) => {
  try {
    // Set author to logged-in user
    req.body.author = req.user.id;

    const post = await Post.create(req.body);
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username email avatar')
      .populate('category', 'name slug');

    apiResponse(res, 201, { post: populatedPost }, 'Post created successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update post
 * @route   PUT /api/posts/:id
 * @access  Private
 */
const updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ApiError('Post not found', 404));
    }

    // Check ownership (admin can edit any post)
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ApiError('Not authorized to update this post', 403));
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('author', 'username email avatar')
      .populate('category', 'name slug');

    apiResponse(res, 200, { post }, 'Post updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete post
 * @route   DELETE /api/posts/:id
 * @access  Private
 */
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ApiError('Post not found', 404));
    }

    // Check ownership (admin can delete any post)
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ApiError('Not authorized to delete this post', 403));
    }

    await Post.findByIdAndDelete(req.params.id);

    apiResponse(res, 200, null, 'Post deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
