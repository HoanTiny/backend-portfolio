const express = require('express');
const { protect } = require('../middleware/auth');
const createCrudController = require('../controllers/crudFactory');

// Import models
const Skill = require('../models/Skill');
const Service = require('../models/Service');
const Experience = require('../models/Experience');
const Project = require('../models/Project');
const Stat = require('../models/Stat');
const Research = require('../models/Research');

// Create controllers
const skillCtrl = createCrudController(Skill, 'skill');
const serviceCtrl = createCrudController(Service, 'service');
const experienceCtrl = createCrudController(Experience, 'experience');
const projectCtrl = createCrudController(Project, 'project');
const statCtrl = createCrudController(Stat, 'stat');
const researchCtrl = createCrudController(Research, 'research');

// Helper: build CRUD routes (public read, protected write)
const buildRoutes = (ctrl) => {
  const router = express.Router();
  router.route('/').get(ctrl.getAll).post(protect, ctrl.create);
  router.route('/:id').get(ctrl.getOne).put(protect, ctrl.update).delete(protect, ctrl.delete);
  return router;
};

/**
 * @swagger
 * tags:
 *   - name: Skills
 *     description: Technologies & tools
 *   - name: Services
 *     description: Services offered
 *   - name: Experiences
 *     description: Work & education timeline
 *   - name: Projects
 *     description: Portfolio projects
 *   - name: Stats
 *     description: Stats counters
 *   - name: Research
 *     description: Research topics
 */

module.exports = {
  skillRoutes: buildRoutes(skillCtrl),
  serviceRoutes: buildRoutes(serviceCtrl),
  experienceRoutes: buildRoutes(experienceCtrl),
  projectRoutes: buildRoutes(projectCtrl),
  statRoutes: buildRoutes(statCtrl),
  researchRoutes: buildRoutes(researchCtrl),
};
