import express from 'express';
import {
  getAdmins, getAdminById, postAdmin, putAdminById, deleteAdminById,
} from '../controllers/admins';
import validateId from '../middlewares/validateId';
import { validations } from '../validations/admins';

const router = express.Router();

router.get('/', getAdmins);
router.get('/:id', validateId, getAdminById);
router.post('/', validations, postAdmin);
router.delete('/:id', validateId, deleteAdminById);
router.put('/:id', validateId, validations, putAdminById);

export default router;
