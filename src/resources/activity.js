const express = require('express');
const fs = require('fs');

const router = express.Router();

const activities = require('../data/activity.json');

router.post('/', (req, res) => {
  const {
    id, name, description,
  } = req.body;

  if (!id || !name || !description) {
    return res.status(400).json({ error: 'All fields must be completed' });
  }
  const activityExists = activities.find((activityData) => activityData.id === id);

  if (activityExists) {
    return res.status(400).json({ error: 'This ID already exists' });
  }
  activities.push(req.body);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities), (err) => {
    if (err) return res.status(500).json({ error: 'Error! Activity could not be created' });
    return res.send('Activity successfully created');
  });
  return null;
});

module.exports = router;
