const express = require('express');

const subscription = require('../data/subscription.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(subscription);
});

router.get('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const findSubscription = subscription.find((sub) => sub.id.toString() === subscriptionId);
  if (findSubscription) {
    res.send(findSubscription);
  } else {
    res.send('subscription not found');
  }
});

module.exports = router;
