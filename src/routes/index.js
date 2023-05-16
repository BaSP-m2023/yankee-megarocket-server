import express from 'express';

import trainerRoutes from './trainers';

import membersRoutes from './members';

import classesRoutes from './classes';

const router = express.Router();

router.use('/trainers', trainerRoutes);
router.use('/members', membersRoutes);

router.use('/classes', classesRoutes);

export default router;
