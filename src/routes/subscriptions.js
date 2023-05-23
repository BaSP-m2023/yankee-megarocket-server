import express from 'express';
import {
  getSubscriptions, getSubscriptionById,
  postSubscription, putSubscriptionById, deleteSubscriptionById,
} from '../controllers/subscriptions';
import validSubscription from '../validations/subscriptions';
import validateId from '../middlewares/validateId';

const router = express.Router();

router.get('/', getSubscriptions);
router.get('/:id', validateId, getSubscriptionById);
router.post('/', validSubscription, postSubscription);
router.put('/:id', validateId, validSubscription, putSubscriptionById);
router.delete('/:id', validateId, deleteSubscriptionById);

export default router;
