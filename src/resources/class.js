const express = require('express');

const router = express.Router();

const fs = require('fs');
const classes = require('../data/class.json');

router.post('/post', (req, res) => {
  const newClass = req.body;
  classes.push(newClass);
  if (Object.keys(newClass).length === 6
    && Object.values(newClass).length === 6
    && Object.values(newClass).indexOf({}) >= 0) {
    fs.writeFile('src/data/class.json', JSON.stringify(classes), (err) => {
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
