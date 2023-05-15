import express from 'express';
import {
  editMember, deleteMember,
} from '../controllers/members';
import { memberEditValidation } from '../validations/members';

const router = express.Router();

router.put('/', memberEditValidation, editMember);
router.delete('/:id', deleteMember);

export default router;
