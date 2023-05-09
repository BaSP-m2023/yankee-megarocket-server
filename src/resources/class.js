const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');
const classes = require('../data/class.json');

router.get('/', (req, res) => {
  if (classes.length === 0) {
    res.send('Oops! There are no classes!');
  } else {
    res.send(classes);
  }
});

router.get('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((aClass) => aClass.id.toString() === classId);
  if (foundClass) {
    res.send(foundClass);
  } else {
    res.send('Class not found!');
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const iClasses = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/class.json')));
  const classId = iClasses.findIndex((aClass) => aClass.id.toString() === id);
  const classUpdate = req.body;
  if (classId === -1) return res.status(404).send('No class found with this id');
  const updatedClasses = iClasses.map((aClass) => {
    if (aClass.id.toString() === id) {
      return {
        ...aClass,
        ...classUpdate,
      };
    }
    return aClass;
  });
  fs.writeFile(path.join(__dirname, '../data/class.json'), JSON.stringify(updatedClasses, null, 2), (err) => {
    if (err) return res.status(500).send('Error updating class');
    return res.json('Class updated');
  });
  return null;
});

module.exports = router;
