const express = require('express');

const fs = require('fs');

const admins = require('../data/admins.json');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    id, firstName, lastName, dni, email, phone, password,
  } = req.body;

  if (!id || !firstName || !lastName || !dni || !phone || !email || !password) {
    return res.status(400).json({ error: 'All fields must be completed' });
  }
  const adminExists = admins.find((adminData) => adminData.id === id);

  if (adminExists) {
    return res.status(400).json({ error: 'This ID already exists' });
  }
  admins.push(req.body);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) return res.status(500).json({ error: 'Error! Admin could not be created' });
    return res.send('Admin successfully created');
  });
  return null;
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

router.put('/:id', (req, res) => {
  const adminId = req.params.id;
  const updatedData = req.body;
  const updatedAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (!updatedAdmin) {
    return res.send('Admin not found');
  }
  admins[adminId - 1].firstName = updatedData.firstName || admins[adminId - 1].firstName;
  admins[adminId - 1].lastName = updatedData.lastName || admins[adminId - 1].lastName;
  admins[adminId - 1].dni = updatedData.dni || admins[adminId - 1].dni;
  admins[adminId - 1].phone = updatedData.phone || admins[adminId - 1].phone;
  admins[adminId - 1].email = updatedData.email || admins[adminId - 1].email;
  admins[adminId - 1].password = updatedData.password || admins[adminId - 1].password;
  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 2), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.send(admins[adminId - 1]);
});

router.delete('/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (!foundAdmin) return res.send('Admin not found!');
  const filteredAdmins = admins.filter((admin) => admin.id.toString() !== adminId);
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins, null, 2), (err) => {
    if (err) return res.status(500).send('Error! Admin cannot not be deleted');
    return res.send('Admin deleted!');
  });
  return null;
});

module.exports = router;
