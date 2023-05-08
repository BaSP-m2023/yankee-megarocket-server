const express = require('express');
const fs = require('fs');
const members = require('../data/member.json');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    id, firstName, lastName, dni, email, phone, password,
  } = req.body;

  if (!id || !firstName || !lastName || !dni || !phone || !email || !password) {
    res.status(400).json({ error: 'All fields must be completed' });
    return;
  }
  const memberExists = members.find((memberData) => memberData.id === id);

  if (memberExists) {
    res.status(400).json({ error: 'This ID already exists' });
    return;
  }
  members.push(req.body);
  fs.writeFile('src/data/member.json', JSON.stringify(members), (err) => {
    if (err) {
      res.status(500).json({ error: 'Error! member could not be created' });
    } else {
      res.send('Member successfully created');
    }
  });
});
module.exports = router;
