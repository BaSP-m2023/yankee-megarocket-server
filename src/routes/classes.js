import express from 'express';
import {
  getClasses, getClassById, postClass, putClassById, deleteClassById,
} from '../controllers/classes';
import validClass from '../validations/classes';
import validateId from '../middlewares/validateId';

const router = express.Router();

router
  .get('/', getClasses)
  .get('/:id', validateId, getClassById)
  .post('/', validClass, postClass)
  .put('/:id', validateId, validClass, putClassById)
  .delete('/:id', validateId, deleteClassById);

export default router;
