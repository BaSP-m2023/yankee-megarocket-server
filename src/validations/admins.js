const Joi = require('joi');

const validateCreateAdmin = (req, res, next) => {
  const validateAdmin = Joi.object({
    firstName: Joi.string().min.length(3).max.length(15).required(),
    lastName: Joi.string().min.length(3).max.length(15).required(),
    dni: Joi.string().min(10000000).max(99999999).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(1000000).max(9999999).required(),
    password: Joi.string().min.length(6).required(),
  });
  const validation = validateAdmin.validate(req.body);
  if (!validation.error) {
    next();
  }
  res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdateAdmin = (req, res, next) => {
  const validateAdmin = Joi.object({
    firstName: Joi.string().min.length(3).max.length(15),
    lastName: Joi.string().min.length(3).max.length(15),
    dni: Joi.string().min(10000000).max(99999999),
    email: Joi.string().email(),
    phone: Joi.string().min(100000000).max(999999999),
    password: Joi.string().min.length(6),
  });
  const validation = validateAdmin.validate(req.body);
  if (!validation.error) {
    next();
  }
  req.status(400).json({
    message: `Error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreateAdmin,
  validateUpdateAdmin,
};
