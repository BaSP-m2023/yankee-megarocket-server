const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');
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

router.get('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((aClass) => aClass.id.toString() === classId);
  if (foundClass) {
    res.send(foundClass);
  } else {
    res.send('Class not found!');
  }
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
  fs.writeFile(path.join(__dirname, '../data/classes.json'), JSON.stringify(updatedClasses, null, 2), (err) => {
    if (err) return res.status(500).send('Error updating class');
    return res.json('Class updated');
  });
  return null;
});

module.exports = router;
