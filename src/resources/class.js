const express = require('express');

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
  const foundClass = classes.find((classes) => classes.id.toString() === classId);
  if(foundClass){
    res.send(foundClass);
  } else{
    res.status(404).send('Class not found')
  }
});

module.exports = router;
