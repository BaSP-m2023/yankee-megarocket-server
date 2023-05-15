import express from 'express';
import { createMember, getMember, getMemberId } from '../controllers/members';
import { memberCreateValidation } from '../validations/members';

const router = express.Router();

router.get('/', getMember);
router.get('/:id', getMemberId);
router.post('/', memberCreateValidation, createMember);

export default router;
