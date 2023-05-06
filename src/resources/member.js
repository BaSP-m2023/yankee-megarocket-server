// GET
const express = require('express');

const router = express.Router();

const members = require('../data/member.json');

router.get('/get', (req, res) => {
  if (members.length === 0) {
    res.send('oops! There are no members!');
  } else {
    res.send(members);
  }
});

// FIN DEL GET

// GET BY ID

router.get('/getById/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = members.find((member) => member.id.toString() === memberId);
  if (foundMember) {
    res.send(foundMember);
  } else {
    res.send('Member not found!');
  }
});

module.exports = router;
// FIN DEL GET BY ID
