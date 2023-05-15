const Joi = require('joi');

const validateUpdateAdmin = (req, res, next) => {
  const validateAdmin = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    dni: Joi.number().min(10000000).max(99999999),
    email: Joi.string().email(),
    phone: Joi.number().min(100000000).max(999999999),
    password: Joi.string().min(6),
  });
  const validation = validateAdmin.validate(req.body);
  if (!validation.error) return next();

  return res.status(400).json({
    message: `Error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateUpdateAdmin,
};
