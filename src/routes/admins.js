import express from 'express';
import { getAdmins, getAdminById, createAdmin } from '../controllers/admins';
import { validationCreation } from '../validations/admins';

const router = express.Router();

router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.post('/', validationCreation, createAdmin);

export default router;
