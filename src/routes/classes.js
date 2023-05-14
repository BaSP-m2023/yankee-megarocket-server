const express = require('express');
const classesController = require('../controllers/classes');
const validation = require('../validations/classes');

const router = express.Router();

router.get('/', classesController.getClasses);
router.get('/:id', classesController.getClass);
router.post('/', validation, classesController.editClass);
router.delete('/:id', classesController);
router.put('/:id', classesController);

module.exports = router;
