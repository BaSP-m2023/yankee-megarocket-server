import express from 'express';

import {
  deleteTrainer, updateTrainer,
} from '../controllers/trainers';

import validateTrainer from '../validations/trainers';

const router = express.Router();

router.delete('/:id', deleteTrainer);
router.put('/:id', validateTrainer, updateTrainer);

export default router;
