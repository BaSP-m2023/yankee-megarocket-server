// Get & getById Trainer → Araceli
const express = require('express');

const trainers = require('../data/trainer.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.send(trainers);
});

router.get('/get/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const trainer = trainers.find((t) => t.id === id);

  if (trainer) {
    res.send(trainer);
  } else {
    res.status(404).send('Trainer not found');
  }
});

module.exports = router;
