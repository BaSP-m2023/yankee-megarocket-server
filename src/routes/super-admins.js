import express from 'express';

import validateSuperAdmin from '../validations/super-admins';
import { getSuperAdmins, getSuperAdmin, createSuperAdmin } from '../controllers/super-admins';

const router = express.Router();

router.get('/', getSuperAdmins);
router.get('/:id', getSuperAdmin);
router.post('/', validateSuperAdmin, createSuperAdmin);

export default router;
