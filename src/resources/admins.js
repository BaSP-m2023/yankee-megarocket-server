const express = require('express');
const fs = require('fs');

const admins = require('../data/admins.json');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    id, firstName, lastName, dni, email, phone, password,
  } = req.body;

  if (!id || !firstName || !lastName || !dni || !phone || !email || !password) {
    res.status(400).json({ error: 'All fields must be completed' });
    return;
  }
  const adminExists = admins.find((adminData) => adminData.id === id);

  if (adminExists) {
    res.status(400).json({ error: 'This ID already exists' });
    return;
  }
  admins.push(req.body);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.status(500).json({ error: 'Error! Admin could not be created' });
    } else {
      res.send('Admin successfully created');
    }
  });
});
router.get('/', (req, res) => {
  if (admins.length < 1) {
    res.send('There are not Admins');
  } else {
    res.send(admins);
  }
});

router.get('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (!foundAdmin) return res.send('Admin not found!');
  return res.send(foundAdmin);
});

module.exports = router;
