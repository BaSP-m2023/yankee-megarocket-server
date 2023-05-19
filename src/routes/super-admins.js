import express from 'express';

import validSuperAdmin from '../validations/super-admins';
import {
  getSuperAdmins, getSuperAdminById, postSuperAdmin, putSuperAdminById, deleteSuperAdminById,
} from '../controllers/super-admins';
import validateId from '../middlewares/validateId';

const router = express.Router();

router.get('/', getSuperAdmins);
router.get('/:id', validateId, getSuperAdminById);
router.post('/', validSuperAdmin, postSuperAdmin);
router.put('/:id', validateId, validSuperAdmin, putSuperAdminById);
router.delete('/:id', validateId, deleteSuperAdminById);

export default router;
