const Joi = require('joi');

const memberEditValidation = (req, res, next) => {
  const memberValidation = Joi.object({
    firstName: Joi.string().min(3).max(20),
    lastName: Joi.string().min(3).max(20),
    dni: Joi.number().min(1000000).max(99999999),
    email: Joi.string().email().lowercase(),
    phone: Joi.number().min(1000000000).max(9999999999),
    password: Joi.string().min(8).max(30),
  });
  const memberEditValidate = memberValidation.validate(req.body);
  if (!memberEditValidate.error) return next();
  return res.status(400).json({
    message: `There was an error in the validation: ${memberEditValidate.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};
module.exports = {
  memberEditValidation,
};
