import Joi from 'joi';

const validateAdmin = Joi.object({
  firstName: Joi.string().min.length(3).max.length(15).required(),
  lastName: Joi.string().min.length(3).max.length(15).required(),
  dni: Joi.string().min.length(7).max.length(8).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min.length(10).max.length(10).required(),
  password: Joi.string().min.length(6).required(),
});

export default validateAdmin;
