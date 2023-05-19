import express from 'express';
import {
  putActivityById, deleteActivityById, getActivityById, getActivities, postActivity,
} from '../controllers/activities';
import validActivity from '../validations/activities';
import validateId from '../middlewares/validateId';

const router = express.Router();
router.get('/', getActivities);
router.get('/:id', validateId, getActivityById);
router.post('/', validActivity, postActivity);
router.put('/:id', validateId, validActivity, putActivityById);
router.delete('/:id', validateId, deleteActivityById);

export default router;
