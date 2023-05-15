import express from 'express';
import { createActivity, getActivity, getActivityId } from '../controllers/activities';
import { activityCreateValidation } from '../validations/activities';

const router = express.Router();
router.get('/', getActivity);
router.get('/:id', getActivityId);
router.post('/', activityCreateValidation, createActivity);

export default router;
