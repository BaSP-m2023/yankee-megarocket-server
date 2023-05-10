const express = require('express');
const fs = require('fs');

const router = express.Router();
const path = require('path');

const activities = require('../data/activity.json');

router.delete('/:id', async (req, res) => {
  const activityId = req.params.id;

  if (!Number.isInteger(Number(activityId))) {
    res.send('Invalid activity ID');
    return;
  }

  const activityIndex = activities.findIndex((act) => act.id === Number(activityId));
  if (activityIndex === -1) {
    res.send('Activity not found');
    return;
  }

  activities.splice(activityIndex, 1);

  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
    if (err) return res.send('Error! Activity cannot be deleted');
    return res.send('Successfully removed');
  });
});

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
