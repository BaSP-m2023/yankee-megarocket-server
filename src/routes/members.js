import express from 'express';
import {
  updateMember, deleteMember,
} from '../controllers/members';
import { memberEditValidation } from '../validations/members';

const router = express.Router();

router.put('/:id', memberEditValidation, updateMember);
router.delete('/:id', deleteMember);

export default router;
