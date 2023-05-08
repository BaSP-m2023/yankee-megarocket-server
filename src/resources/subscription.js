import { Router } from 'express';

const router = Router();
const fs = require('fs');
const subscription = require('../data/subscription.json');

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
    res.status(400).send({ error: 'Complete fields' });
    return;
  }
  const subscriptionExist = subscription.find((subscriptionData) => subscriptionData.id === id);
  if (subscriptionExist) {
    res.status(400).json({ error: 'This ID already exist' });
    return;
  }
  subscription.push(req.body);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscription), (err) => {
    if (err) return res.send('Error! Subscription cannot be created.');
    return res.send('Subscription Created!');
  });
});

export default router;
