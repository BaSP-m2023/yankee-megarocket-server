const Joi = require('joi');

const memberCreateValidation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    dni: Joi.number().min(7).max(8).required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.number().min(10).max(10).required(),
    password: Joi.string().min(8).max(30).required(),
  });

  const memberValidate = memberValidation.validate(req.body);
  if (!memberValidate.error) return next();
  return res.status(400).json({
    message: `There was an error in the validation: ${memberValidate.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  memberCreateValidation,
};
