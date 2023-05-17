import express from 'express';

import validateSuperAdmin from '../validations/super-admins';
import {
  getSuperAdmins, getSuperAdmin, createSuperAdmin, updateSuperAdmin, deleteSuperAdmin,
} from '../controllers/super-admins';

const router = express.Router();

router.get('/', getSuperAdmins);
router.get('/:id', getSuperAdmin);
router.post('/', validateSuperAdmin, createSuperAdmin);
router.put('/:id', validateSuperAdmin, updateSuperAdmin);
router.delete('/:id', deleteSuperAdmin);

export default router;
