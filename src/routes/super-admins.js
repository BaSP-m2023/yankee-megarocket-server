import express from 'express';
import { getSuperAdmins, getSuperAdmin } from '../controllers/super-admins';

const router = express.Router();

router.get('/', getSuperAdmins);
router.get('/:id', getSuperAdmin);

export default router;
