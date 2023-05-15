import Joi from 'joi';

const validateTrainer = (req, res, next) => {
  const dataValidation = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
    dni: Joi.number().min(1000000).max(99999999).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
    password: Joi.string().min(6).required(),
    rate: Joi.number().min(10).max(15).required(),
    assignedActivities: Joi.array().items(Joi.string()),
  });

  const trainerData = dataValidation.validate(req.body);

  if (!trainerData.error) return next();
  return res.status(400).json({
    message: `There was an error: ${trainerData.error.message}`,
    data: undefined,
    error: true,
  });
};

export default validateTrainer;
