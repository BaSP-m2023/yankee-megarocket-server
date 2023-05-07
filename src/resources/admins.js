const express = require('express');

const admins = require('../data/admins.json');

const router = express.Router();

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
