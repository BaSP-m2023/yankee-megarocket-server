import Joi from 'joi';

const validSuperAdmin = (req, res, next) => {
  const dataValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const superAdminData = dataValidation.validate(req.body);
  if (!superAdminData.error) return next();
  return res.status(400).json({
    message: `There was an error: ${superAdminData.error.message}`,
    data: undefined,
    error: true,
  });
};
export default validSuperAdmin;
