const express = require('express');
const adminsController = require('../controllers/admins');
const validations = require('../validations/admins');

const router = express.Router();

router
  .delete('/:id', adminsController.deleteAdmin)
  .put('/:id', validations.validateUpdateAdmin, adminsController.updateAdmin);

module.exports = router;
