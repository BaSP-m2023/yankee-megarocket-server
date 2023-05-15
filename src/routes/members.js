import express from 'express';
import {
  getMember, getMemberId, editMember, createMember, deleteMember,
} from '../controllers/members';
import { memberEditValidation } from '../validations/members';

const router = express.Router();
router.get('/', getMember);
router.get('/:id', getMemberId);
router.post('/', createMember);
router.put('/', memberEditValidation, editMember);
router.delete('/:id', deleteMember);

export default router;
