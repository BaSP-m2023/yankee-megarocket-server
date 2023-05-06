const express = require('express');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.send(superAdmins);
});
router.get('/get-by-id/:id', (req, res) => {
  const superAdminID = parseInt(req.params.id, 10);
  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin.id === superAdminID);
  res.send(foundSuperAdmin);
});
module.exports = router;
