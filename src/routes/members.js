import express from 'express';

import {
  getMembers, getMemberById, postMember, putMemberById, deleteMemberById,
} from '../controllers/members';
import validMember from '../validations/members';
import validateId from '../middlewares/validateId';

const router = express.Router();

router.get('/', getMembers);
router.get('/:id', validateId, getMemberById);
router.post('/', validMember, postMember);
router.put('/:id', validateId, validMember, putMemberById);
router.delete('/:id', validateId, deleteMemberById);

export default router;
