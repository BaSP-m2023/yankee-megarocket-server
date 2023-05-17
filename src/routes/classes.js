const express = require('express');
const classesController = require('../controllers/classes');
const validations = require('../validations/classes');

const router = express.Router();

router
  .get('/', classesController.getClasses)
  .get('/:id', classesController.getClass)
  .post('/', validations.validateCreation, classesController.createClass)
  .put('/:id', validations.validateCreation, classesController.updateClass)
  .delete('/:id', classesController.deleteClass);

module.exports = router;
