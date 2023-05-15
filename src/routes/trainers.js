import express from 'express';

import validateTrainer from '../validations/trainers';

import { getTrainers, getTrainer, createTrainer } from '../controllers/trainers';

const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', getTrainer);
router.post('/', validateTrainer, createTrainer);

export default router;
