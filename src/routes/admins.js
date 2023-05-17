import express from 'express';
import {
  getAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin,
} from '../controllers/admins';
import { validations } from '../validations/admins';

const router = express.Router();

router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.post('/', validations, createAdmin);
router.delete('/:id', deleteAdmin);
router.put('/:id', validations, updateAdmin);

export default router;
