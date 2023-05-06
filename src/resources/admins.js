const express = require('express');

const admins = require('../data/admins.json');

const router = express.Router();

router.get('/get', (req, res) => {
  if (!admins) {
    res.send('There are not Admins');
  } else {
    res.send(admins);
  }
});

router.get('/getById/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => admin.id.toString() === adminId);
  if (!foundAdmin) return res.send('Admin not found!');
  return res.send(foundAdmin);
});

module.exports = router;
