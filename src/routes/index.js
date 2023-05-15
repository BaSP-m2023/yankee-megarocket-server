import express from 'express';

import trainerRoutes from './trainers';

const router = express.Router();

router.use('/trainers', trainerRoutes);

export default router;
