import express from 'express';

import trainerRoutes from './trainers';

import membersRoutes from './members';

const router = express.Router();

router.use('/trainers', trainerRoutes);
router.use('/members', membersRoutes);

export default router;
