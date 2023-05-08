const express = require('express');
const fs = require('fs');

const admins = require('../data/admins.json');

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    id, firstName, lastName, dni, phone, email, password,
  } = req.body;

  if (!id || !firstName || !lastName || !dni || !phone || !email || !password) {
    res.status(400).json({ error: 'All fields must be completed' });
    return;
  }
  try {
    admins.push(req.body);
    await fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2));
    res.send('Admin successfully created');
  } catch (err) {
    res.status(500).json({ error: 'Error! new admin could not be created' });
  }
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

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((admin) => admin.id.toString() !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins, null, 2), (err) => {
    if (err) return res.status(500).send('Error! Admin cannot not be deleted');
    return res.send('Admin deleted!');
  });
});

module.exports = router;
