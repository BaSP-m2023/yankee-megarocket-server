import express from 'express';
import { createMember, getMember, getMemberId } from '../controllers/members';

const router = express.Router();

router.get('/', getMember);
router.get('/:id', getMemberId);
router.post('/', createMember);

export default router;
