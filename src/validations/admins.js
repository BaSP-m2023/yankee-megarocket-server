const Joi = require('joi');

const isValidAdmin = (req, res, next) => {
  const validationAdmin = Joi.object({
    firstName: Joi.string().required().min(3).max(10),
    lastName: Joi.string().required().min(3).max(10),
    dni: Joi.number().required().min(1000000),
    phone: Joi.number().required().min(1000000000).max(9999999999),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).alphanum(),
  });

  const validation = validationAdmin.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};
export default isValidAdmin;
