const Profile = require('../models/Profile');
const ApiError = require('../utils/ApiError');
const { apiResponse } = require('../utils/apiResponse');

// Get profile (there's only one)
const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ name: 'Your Name', title: 'Your Title' });
    }
    apiResponse(res, 200, { profile });
  } catch (error) {
    next(error);
  }
};

// Update profile (upsert)
const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true, runValidators: true });
    } else {
      profile = await Profile.create(req.body);
    }
    apiResponse(res, 200, { profile }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
