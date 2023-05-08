const express = require('express');

const router = express.Router();

const fs = require('fs');
const classes = require('../data/class.json');

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
