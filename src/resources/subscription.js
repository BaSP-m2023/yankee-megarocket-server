import { Router } from 'express';
// import { promises as fs } from 'fs';

const router = Router();
const subscription = require('../data/subscription.json');
const fs = require('fs');

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

router.post('/', async (req, res) => {
  const {
    id, classId, memberId, date,
  } = req.body;

  if (!id || !classId || !memberId || !date) {
    res.status(400).json({ error: 'Complete fields' });
    return;
  }
  subscription.push(req.body);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscription), (err) => {
    if (err) {
      res.send('Error! Subscription cannot be created.');
    } else {
      res.send('Subscription Created!');
    }
  });
});

export default router;
