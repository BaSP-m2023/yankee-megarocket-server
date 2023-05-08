const express = require('express');

const subscription = require('../data/subscription.json');

const router = express.Router();

router.get('/', (req, res) => {
  if (subscription.length < 1) return res.send('subscription not found');
  return res.send(subscription);
});

router.get('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const findSubscription = subscription.find((sub) => sub.id.toString() === subscriptionId);
  if (!findSubscription) return res.send('subscription not found');
  return res.send(findSubscription);
});

module.exports = router;
