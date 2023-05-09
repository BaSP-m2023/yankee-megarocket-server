const express = require('express');
const fs = require('fs');

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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'id is required' });
    return;
  }

  try {
    const subscriptionData = await fs.readFile('../data/subscription.json', 'utf8');
    const subscriptions = JSON.parse(subscriptionData);

    const subscriptionIndex = subscriptions.findIndex((item) => item.id === id);
    if (subscriptionIndex !== -1) {
      subscriptions.splice(subscriptionIndex, 1);
      await fs.writeFile('../data/subscription.json', JSON.stringify(subscriptions, null, 2));
      res.status(200).json({ message: 'Subscription deleted' });
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
