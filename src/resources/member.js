// GET
const express = require('express');

const router = express.Router();

const members = require('../data/member.json');

router.get('/get', (req, res) => {
  if (!members) {
    res.send('oops! There are no members!');
  } else {
    res.send(members);
  }
});

module.exports = router;
// FIN DEL GET
