const express = require('express');
const fs = require('fs');

const router = express.Router();

const activities = require('../data/activity.json');

router.post('/', (req, res) => {
  const newActivity = req.body;
  if (Object.keys(newActivity).length === 3
  && Object.values(newActivity).length === 3
  && Object.values(newActivity).indexOf({}) >= 0) {
    activities.push(newActivity);
    fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
      if (err) {
        res.send('Error! Could not create an activity!');
      } else {
        res.send('Activity Created!');
      }
    });
  } else {
    res.send('Error. The activity must contain exactly 3 items with some value each.');
  }
});

module.exports = router;
