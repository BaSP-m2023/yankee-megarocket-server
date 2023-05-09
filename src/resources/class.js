const express = require('express');
const fs = require('fs');

const router = express.Router();

const classes = require('../data/class.json');

router.get('/', (req, res) => {
  if (classes.length < 1) {
    res.status(404).send('No classes available');
  } else {
    res.send(classes);
  }
});

router.get('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((aClass) => aClass.id.toString() === classId);
  if (!foundClass) return res.status(404).send('Class not found!');
  return res.send(foundClass);
});

router.post('/', (req, res) => {
  const {
    id, activityId, hour, day, trainerId, maxCapacity,
  } = req.body;

  if (!id || !activityId || !hour || !day || !trainerId || !maxCapacity) {
    return res.status(400).json({ error: 'All fields must be completed' });
  }
  const classExists = classes.find((classData) => classData.id === id);

  if (classExists) {
    return res.status(400).json({ error: 'This ID already exists' });
  }
  classes.push(req.body);
  fs.writeFile('src/data/class.json', JSON.stringify(classes), (err) => {
    if (err) return res.status(500).json({ error: 'Error! Class could not be created' });
    return res.send('Class successfully created');
  });
  return null;
});

router.delete('/:id', (req, res) => {
  const classId = req.params.id;
  const filteredClass = classes.filter((IdClass) => IdClass.id.toString() !== classId);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredClass, null, 2), (err) => {
    if (err) {
      res.send('Class could not be deleted');
    } else {
      res.send('Class has been removed');
    }
  });
});

router.delete('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((idClass) => idClass.id.toString() === classId);
  if (!foundClass) return res.status(404).send('Class not found');
  const filteredClass = classes.filter((idClass) => idClass.id.toString() !== classId);
  fs.writeFile('src/data/class.json', JSON.stringify(filteredClass, null, 2), (err) => {
    if (err) return res.status(500).send('Class could not be deleted');
    return res.send('Class has been removed');
  });
  return null;
});

module.exports = router;
