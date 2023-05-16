import express from 'express';

import classesRoutes from './classes';
import membersRoutes from './members';
import superAdminsRoutes from './super-admins';
import trainerRoutes from './trainers';

const router = express.Router();

router.use('/classes', classesRoutes);
router.use('/members', membersRoutes);
router.use('/super-admins', superAdminsRoutes);
router.use('/trainers', trainerRoutes);

export default router;
