import express from 'express';
import {
  getMember, getMemberId, editMember, createMember,
} from '../controllers/members';

const router = express.Router();
router.get('/', getMember);
router.get('/', getMemberId);
router.post('/', createMember);
router.put('/', editMember);

export default router;
