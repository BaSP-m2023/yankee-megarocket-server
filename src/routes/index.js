import express from 'express';

import trainerRoutes from './trainers';

import membersRoutes from './members';

import superAdminsRoutes from './super-admins';

const router = express.Router();

router.use('/trainers', trainerRoutes);
router.use('/members', membersRoutes);
router.use('/super-admins', superAdminsRoutes);

export default router;
