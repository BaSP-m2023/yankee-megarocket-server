import { Router } from 'express';
import { promises as fs } from 'fs';

const subscription = require('../data/subscription.json');

const router = Router();

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

router.put('/', (req, res) => {
  const {
    id, classId, memberId, date,
  } = req.body;

  if (!id || !classId || !memberId || !date) {
    res.status(400).json({ error: 'All fields must be completed' });
    return;
  }
  const subscriptionExists = subscription.find((memberData) => memberData.id === id);
  if (!subscriptionExists) {
    res.status(400).json({ error: 'This ID does not exist' });
    return;
  }
  const subscriptionIndex = subscription.findIndex((memberData) => memberData.id === id);
  subscription.splice(subscriptionIndex, 1, req.body);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscription, null, 2), (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error in edition' });
    }
  });
  res.send('Subscription Successfully edited');
});

export default router;
