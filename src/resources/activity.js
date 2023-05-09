const express = require('express');
const fs = require('fs');

const router = express.Router();

const activities = require('../data/activity.json');

router.post('/', (req, res) => {
  const {
    id, name, description,
  } = req.body;

  if (!id || !name || !description) {
    res.status(400).json({ error: 'All fields must be completed' });
    return;
  }
  const activityExists = activities.find((activityData) => activityData.id === id);

  if (activityExists) {
    res.status(400).json({ error: 'This ID already exists' });
    return;
  }
  activities.push(req.body);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities), (err) => {
    if (err) return res.status(500).json({ error: 'Error! Activity could not be created' });
    return res.send('Activity successfully created');
  });
});

module.exports = router;
