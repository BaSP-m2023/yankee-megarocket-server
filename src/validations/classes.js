const Joi = require('joi');

const validClass = (req, res, next) => {
  const validateClassSchema = Joi.object({
    activityId: Joi.string().alphanum().required(),
    hour: Joi.number().min(8).max(21).required(),
    day: Joi.string().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday').required(),
    trainerId: Joi.string().alphanum().required(),
    maxCapacity: Joi.number().min(3).max(30).required(),
  });
  const validation = validateClassSchema.validate(req.body);
  if (!validation.error) return next();
  return res.status(400).json({
    message: `There was an error: ${validation.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

export default validClass;
