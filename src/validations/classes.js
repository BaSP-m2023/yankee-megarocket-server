const Joi = require('joi');

const validateCreation = (req, res, next) => {
  const validateClassSchema = Joi.object({
    id: Joi.string().alphanum().lowercase().required(),
    activityId: Joi.string().alphanum().lowercase().required(),
    hour: Joi.number().min(8).max(21).required(),
    day: Joi.string().lowercase().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday').required(),
    trainerId: Joi.string().alphanum().lowercase().required(),
    maxCapacity: Joi.number().min(3).max(30).required(),
  });
  const validation = validateClassSchema.validate(req.body);
  if (!validation.error) return next;
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

const validateUpdate = (req, res, next) => {
  const validateClassSchema = Joi.object({
    activityId: Joi.string().alphanum().lowercase(),
    hour: Joi.number().min(8).max(21),
    day: Joi.string().lowercase().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday'),
    trainerId: Joi.string().alphanum().lowercase(),
    maxCapacity: Joi.number().min(3).max(30),
  });
  const validation = validateClassSchema.validate(req.body);
  if (!validation.error) return next;
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = {
  validateCreation,
  validateUpdate,
};
