import express from 'express';

import validateTrainer from '../validations/trainers';

import {
  deleteTrainer, updateTrainer,
} from '../controllers/trainers';

const router = express.Router();

router
  .delete('/trainers', deleteTrainer)
  .put('/trainers', validateTrainer, updateTrainer);

export default router;
