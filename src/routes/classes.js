import express from 'express';
import classesController from '../controllers/classes';
import validation from '../validations/classes';

const router = express.Router();

router
  .get('/', classesController.getClasses)
  .get('/:id', classesController.getClass)
  .post('/', validation.validateCreation, classesController.createClass)
  .put('/:id', validation.validateCreation, classesController.updateClass)
  .delete('/:id', classesController.deleteClass);

export default router;
