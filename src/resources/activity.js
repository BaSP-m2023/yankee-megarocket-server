const express = require('express');
const fs = require('fs');

const router = express.Router();

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

module.exports = router;
