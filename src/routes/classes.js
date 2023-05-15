import express from 'express';
import classesController from '../controllers/classes';
import validation from '../validations/classes';

const router = express.Router();

router.get('/', classesController.getClasses);
router.get('/:id', classesController.getClass);
router.post('/', validation.validateCreation, classesController.createClass);

export default router;
