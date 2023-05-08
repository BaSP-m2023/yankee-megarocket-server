const express = require('express');
const path = require('path');
const fs = require('fs');
const activities = require('../data/activity.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const activityId = activities.findIndex((activity) => activity.id.toString() === id);
  const activityUpdate = req.body;

  if (activityId === -1) return res.send('No activity Found with this id');
  const activity = activities[activityId];
  activities[activityId] = {
    ...activity,
    ...activityUpdate,
  };

  fs.writeFile(path.join(__dirname, '../data/activity.json'), JSON.stringify(activities, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error updating activity');
    }
  });

  return res.json({ msg: 'Activity updated', activity: activities[activityId] });
});

module.exports = router;
