// Generic CRUD factory for simple portfolio models (Skill, Service, Experience, Project, Stat, Research)
const ApiError = require('../utils/ApiError');
const { apiResponse } = require('../utils/apiResponse');

const createCrudController = (Model, modelName) => ({
  getAll: async (req, res, next) => {
    try {
      const items = await Model.find().sort({ order: 1, createdAt: -1 });
      apiResponse(res, 200, { [modelName + 's']: items });
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return next(new ApiError(`${modelName} not found`, 404));
      apiResponse(res, 200, { [modelName]: item });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      apiResponse(res, 201, { [modelName]: item }, `${modelName} created successfully`);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return next(new ApiError(`${modelName} not found`, 404));
      apiResponse(res, 200, { [modelName]: item }, `${modelName} updated successfully`);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return next(new ApiError(`${modelName} not found`, 404));
      apiResponse(res, 200, null, `${modelName} deleted successfully`);
    } catch (error) {
      next(error);
    }
  },
});

module.exports = createCrudController;
