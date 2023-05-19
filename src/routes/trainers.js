import express from 'express';

import {
  deleteTrainer, updateTrainer,
  getTrainers, getTrainerById, postTrainer,
} from '../controllers/trainers';

import validateTrainer from '../validations/trainers';

const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', getTrainerById);
router.post('/', validateTrainer, postTrainer);
router.delete('/:id', deleteTrainer);
router.put('/:id', validateTrainer, updateTrainer);

export default router;
