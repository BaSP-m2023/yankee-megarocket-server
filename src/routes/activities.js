import express from 'express';
import {
  putActivityById, deleteActivityById, getActivityById, getActivities, postActivity,
} from '../controllers/activities';
import { activityCreateValidation } from '../validations/activities';
import validateId from '../middlewares/validateId';

const router = express.Router();
router.get('/', getActivities);
router.get('/:id', validateId, getActivityById);
router.post('/', activityCreateValidation, postActivity);
router.put('/:id', validateId, activityCreateValidation, putActivityById);
router.delete('/:id', validateId, deleteActivityById);

export default router;
