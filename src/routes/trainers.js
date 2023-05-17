import express from 'express';

import {
  deleteTrainer, updateTrainer,
  getTrainers, getTrainer, createTrainer,
} from '../controllers/trainers';

import validateTrainer from '../validations/trainers';

const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', getTrainer);
router.post('/', validateTrainer, createTrainer);
router.delete('/:id', deleteTrainer);
router.put('/:id', validateTrainer, updateTrainer);

export default router;
