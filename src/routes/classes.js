const express = require('express');
const classesController = require('../controllers/classes');
const validations = require('../validations/classes');

const router = express.Router();

router
  .put('/:id', validations.validateCreation, classesController.updateClass)
  .delete('/:id', classesController.deleteClass);

module.exports = router;
