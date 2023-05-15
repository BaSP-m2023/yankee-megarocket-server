const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');

const router = express.Router();

router
  .delete('/:id', adminsController.deleteAdmins)
  .put('/:id', validations.validateUpdate, adminsController.updateAdmins);

module.exports = router;
