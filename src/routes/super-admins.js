import express from 'express';

import validSuperAdmin from '../validations/super-admins';
import {
  getSuperAdmins, getSuperAdminById, postSuperAdmin, putSuperAdminById, deleteSuperAdmin,
} from '../controllers/super-admins';

const router = express.Router();

router.get('/', getSuperAdmins);
router.get('/:id', getSuperAdminById);
router.post('/', validSuperAdmin, postSuperAdmin);
router.put('/:id', validSuperAdmin, putSuperAdminById);
router.delete('/:id', deleteSuperAdmin);

export default router;
