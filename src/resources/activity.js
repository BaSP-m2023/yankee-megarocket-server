const express = require('express');
const path = require('path');
const fs = require('fs');
const activities = require('../data/activity.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const activityId = activities.findIndex((activity) => activity.id.toString() === id);
  const activityUpdate = req.body;

  if (activityId === -1) return res.status(404).send('No activity Found with this id');
  const activity = activities[activityId];
  activities[activityId] = {
    ...activity,
    ...activityUpdate,
  };

  fs.writeFile(path.join(__dirname, '../data/activity.json'), JSON.stringify(activities, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error updating activity');
    }
    return res.json('Activity updated');
  });

  return res.json('Activity updated succesfully!');
});

router.get('/', (req, res) => {
  if (activities.length < 1) {
    res.status(404).send('No registered activities');
  } else { res.send(activities); }
});

router.get('/:id', (req, res) => {
  const activityID = req.params.id;
  const foundActivity = activities.find((activity) => activity.id.toString() === activityID);
  if (!foundActivity) return res.status(404).send('Activity not found');
  return res.send(foundActivity);
});

module.exports = router;
