const express = require('express');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.get('/', (req, res) => {
  if (superAdmins) {
    res.send(superAdmins);
  } else {
    res.send('Superadmin Error');
  }
});
router.get('/:id', (req, res) => {
  const superAdminID = req.params.id;
  const foundSuperAdmin = superAdmins.find((superA) => superA.id.toString() === superAdminID);
  if (foundSuperAdmin) {
    res.send(foundSuperAdmin);
  } else {
    res.send('SuperAdmin not found');
  }
});
module.exports = router;
