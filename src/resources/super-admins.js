const express = require('express');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  if (!superAdmins) return res.send('superAdmin error');
  return res.send(superAdmins);
});

router.get('/:id', (req, res) => {
  const superAdminID = req.params.id;
  const foundSuperAdmin = superAdmins.find((superA) => superA.id.toString() === superAdminID);
  if (!foundSuperAdmin) return res.send('SuperAdmin not found');
  return res.send(foundSuperAdmin);
});
module.exports = router;
