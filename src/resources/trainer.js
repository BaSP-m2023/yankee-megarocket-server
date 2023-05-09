const express = require('express');
const fs = require('fs');

const trainers = require('../data/trainer.json');

const router = express.Router();

router.get('/', (req, res) => {
  if (trainers.length === 0) {
    res.status(404).send('No trainers available at the moment');
  } else {
    res.send(trainers);
  }
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const trainer = trainers.find((trainerData) => trainerData.id === id);

  if (trainer) {
    res.send(trainer);
  } else {
    res.status(404).send('Trainer not found');
  }
});

router.delete('/:id', (req, res) => {
  const trainerId = req.params.id;
  const foundTrainer = trainers.find((trainer) => trainer.id.toString() === trainerId);
  if (!foundTrainer) return res.send('Trainer not found!');
  const filteredTrainers = trainers.filter((trainer) => trainer.id.toString() !== trainerId);
  fs.writeFile('src/data/trainer.json', JSON.stringify(filteredTrainers, null, 2), (err) => {
    if (err) return res.status(500).send('Trainer could not be deleted!');
    return res.send('Trainer Deleted!');
  });
  return null;
});

router.post('/', (req, res) => {
  const previousId = trainers.length - 1;
  const trainerId = trainers[previousId].id + 1;
  const {
    firstName, lastName, dni, email, phone, password, rate,
  } = req.body;
  if (!firstName || !lastName || !dni || !email || !phone || !password || !rate) {
    return res.send('All field are required');
  }
  const newTrainer = {
    trainerId, firstName, lastName, dni, email, phone, password, rate,
  };
  trainers.push(newTrainer);
  fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => res.send(err));
  return res.send('new trainer added successfully');
});

module.exports = router;
