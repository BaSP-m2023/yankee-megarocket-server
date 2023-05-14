import express from 'express';
import { getAdmins, getAdminById, createAdmin } from '../controllers/admins';

const router = express.Router();

router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.post('/', createAdmin);

export default router;
