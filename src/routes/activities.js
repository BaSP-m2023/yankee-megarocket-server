import express from 'express';
import { updateActivity } from '../controllers/activities';
import { activityCreateValidation } from '../validations/activities';

const router = express.Router();
router.put('/:id', activityCreateValidation, updateActivity);

export default router;
