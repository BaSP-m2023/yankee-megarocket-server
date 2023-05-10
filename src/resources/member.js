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

router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const updatedData = req.body;
  const updatedMember = members.find((member) => member.id.toString() === memberId);
  if (!updatedMember) {
    return res.send('Member not found');
  }
  members[memberId - 1].firstName = updatedData.firstName || members[memberId - 1].firstName;
  members[memberId - 1].lastName = updatedData.lastName || members[memberId - 1].lastName;
  members[memberId - 1].dni = updatedData.dni || members[memberId - 1].dni;
  members[memberId - 1].email = updatedData.email || members[memberId - 1].email;
  members[memberId - 1].phone = updatedData.phone || members[memberId - 1].phone;
  members[memberId - 1].password = updatedData.password || members[memberId - 1].password;
  fs.writeFile('src/data/member.json', JSON.stringify(members, null, 2), (err) => {
    if (err) {
      res.send(err);
    }
  });
  return res.send(members[memberId - 1]);
});

router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((idMember) => idMember.id.toString() === memberId);
  if (!foundMember) return res.status(404).send('Member not found');
  const filteredMember = members.filter((idMember) => idMember.id.toString() !== memberId);
  fs.writeFile('src/data/member.json', JSON.stringify(filteredMember, null, 2), (err) => {
    if (err) return res.status(500).send('Member could not be deleted');
    return res.send('Member has been removed');
  });
  return null;
});

router.get('/', (req, res) => {
  if (members.length === 0) {
    res.send('oops! There are no members!');
  } else {
    res.send(members);
  }
});

router.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((aMember) => aMember.id.toString() === memberId);
  if (foundMember) {
    res.send(foundMember);
  } else {
    res.send('Member not found!');
  }
});

module.exports = router;
