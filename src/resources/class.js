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
  const newClass = req.body;
  if (Object.keys(newClass).length === 6
  && Object.values(newClass).length === 6
  && Object.values(newClass).indexOf({}) >= 0) {
    classes.push(newClass);
    fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
      if (err) {
        res.send('Error! Could not create class!');
      } else {
        res.send('Class Created!');
      }
    });
  } else {
    res.send('Error. Class must contain exactly 6 items with some value each.');
  }
});

module.exports = router;
