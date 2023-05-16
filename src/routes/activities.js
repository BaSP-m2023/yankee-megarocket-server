import express from 'express';
import { updateActivity, deleteActivity } from '../controllers/activities';
import { activityCreateValidation } from '../validations/activities';

const router = express.Router();
router.put('/:id', activityCreateValidation, updateActivity);
router.delete('/:id', deleteActivity);

export default router;
