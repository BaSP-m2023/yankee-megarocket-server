const express = require('express');

const router = express.Router();
const Classes = require('../data/class.json');

router.get('/', (req, res) => {
  if (Classes.length < 1) {
    res.status(404).send('No classes available');
  } else {
    res.send(Classes);
  }
});

router.get('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = Classes.find((classes) => classes.id.toString() === classId);
  if (!foundClass) return res.status(404).send('Class not found!');
  return res.send(foundClass);
});

module.exports = router;
