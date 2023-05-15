import express from 'express';
import { createActivity, getActivity, getActivityId } from '../controllers/activities';

const router = express.Router();
router.get('/', getActivity);
router.get('/:id', getActivityId);
router.post('/', createActivity);

export default router;
