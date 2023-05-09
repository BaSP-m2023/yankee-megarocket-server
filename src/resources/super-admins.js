const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const idSuperAdmin = req.params.id;
  const indexSuperAdmin = superAdmins.findIndex((superAdmin) => superAdmin.id.toString()
  === idSuperAdmin);
  const superAdminUpd = req.body;

  if (indexSuperAdmin === -1) return res.status(404).send('No Super Admin Found with this id');
  const superAdmin = superAdmins[indexSuperAdmin];
  superAdmins[indexSuperAdmin] = {
    ...superAdmin,
    ...superAdminUpd,
  };
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error updating Super Admin');
    }
    return res.json('Super Admin updated');
  });

  return res.json('Super Admin updated succesfully!');
});
module.exports = router;
