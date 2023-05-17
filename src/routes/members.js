import express from 'express';
import {
  createMember, getMember, getMemberId, updateMember, deleteMember,
} from '../controllers/members';
import { memberCreateValidation } from '../validations/members';

const router = express.Router();

router.get('/', getMember);
router.get('/:id', getMemberId);
router.post('/', memberCreateValidation, createMember);
router.put('/:id', memberCreateValidation, updateMember);
router.delete('/:id', deleteMember);

export default router;
