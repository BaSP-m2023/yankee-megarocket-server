import express from 'express';

import {
  getMembers, getMemberById, postMember, putMemberById, deleteMemberById,
} from '../controllers/members';
import isValidMember from '../validations/members';
import validateId from '../middlewares/validateId';

const router = express.Router();

router.get('/', getMembers);
router.get('/:id', validateId, getMemberById);
router.post('/', isValidMember, postMember);
router.put('/:id', validateId, isValidMember, putMemberById);
router.delete('/:id', validateId, deleteMemberById);

export default router;
