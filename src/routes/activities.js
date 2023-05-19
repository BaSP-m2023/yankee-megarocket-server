import express from 'express';
import {
  putActivityById, deleteActivityById, getActivityById, getActivities, postActivity,
} from '../controllers/activities';
import isValidActivity from '../validations/activities';
import validateId from '../middlewares/validateId';

const router = express.Router();
router.get('/', getActivities);
router.get('/:id', validateId, getActivityById);
router.post('/', isValidActivity, postActivity);
router.put('/:id', validateId, isValidActivity, putActivityById);
router.delete('/:id', validateId, deleteActivityById);

export default router;
