const express = require('express');
const fs = require('fs/promises');
const admins = require('../data/admins.json');

const router = express.Router();

router.post('/register', async (req, res) => {
  const {
    id, firstName, lastName, dni, phone, email, password,
  } = req.body;

  if (!id || !firstName || !lastName || !dni || !phone || !email || !password) {
    res.status(400).json({ error: 'All fields must be completed' });
    return;
  }
  const newAdmin = {
    id,
    firstName,
    lastName,
    dni,
    phone,
    email,
    password,
  };
  try {
    admins.push(newAdmin);
    await fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2));
    res.send('Admin successfully created');
  } catch (err) {
    res.status(500).json({ error: 'Error! new admin could not be created' });
  }
});

module.exports = router;
