const express = require('express');

const router = express.Router();

const member = require('../data/member.json');

router.get('/', (req, res) => {
  if (member.length === 0) {
    res.send('oops! There are no members!');
  } else {
    res.send(member);
  }
});

router.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const foundMember = member.find((aMember) => aMember.id.toString() === memberId);
  if (foundMember) {
    res.send(foundMember);
  } else {
    res.send('Member not found!');
  }
});

module.exports = router;
