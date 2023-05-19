import express from 'express';
import {
  getClasses, getClassById, postClass, putClassById, deleteClassById,
} from '../controllers/classes';
import isValidClass from '../validations/classes';
import validateId from '../middlewares/validateId';

const router = express.Router();

router
  .get('/', getClasses)
  .get('/:id', validateId, getClassById)
  .post('/', isValidClass, postClass)
  .put('/:id', validateId, isValidClass, putClassById)
  .delete('/:id', validateId, deleteClassById);

export default router;
