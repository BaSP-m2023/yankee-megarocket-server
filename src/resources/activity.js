const express = require('express');

const router = express.Router();

const activities = require('../data/activity.json');

router.get('/', (req, res) => {
  if (activities.length < 1) {
    res.status(404).send('No registered activities');
  } else { res.send(activities); }
});

router.get('/:id', (req, res) => {
  const activityID = req.params.id;
  const foundActivity = activities.find((activity) => activity.id.toString() === activityID);
  if (!foundActivity) return res.send('Activity not found');
  return res.send(foundActivity);
});

module.exports = router;
