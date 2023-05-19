import express from 'express';

import {
  deleteTrainerById, putTrainerById,
  getTrainers, getTrainerById, postTrainer,
} from '../controllers/trainers';
import validTrainer from '../validations/trainers';
import validateId from '../middlewares/validateId';

const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', validateId, getTrainerById);
router.post('/', validTrainer, postTrainer);
router.put('/:id', validateId, validTrainer, putTrainerById);
router.delete('/:id', validateId, deleteTrainerById);

export default router;
