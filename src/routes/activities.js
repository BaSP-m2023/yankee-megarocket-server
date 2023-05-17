import express from 'express';
import {
  updateActivity, deleteActivity, createActivity, getActivity, getActivityId,
} from '../controllers/activities';
import { activityCreateValidation } from '../validations/activities';

const router = express.Router();
router.put('/:id', activityCreateValidation, updateActivity);
router.delete('/:id', deleteActivity);
router.get('/', getActivity);
router.get('/:id', getActivityId);
router.post('/', activityCreateValidation, createActivity);

export default router;
