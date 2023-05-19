const Joi = require('joi');

const isValidActivity = (req, res, next) => {
  const activityValidation = Joi.object({
    activityName: Joi.string().min(3).max(30).required(),
    activityDescription: Joi.string().min(10).max(250).required(),
  });

  const activityValidate = activityValidation.validate(req.body);
  if (!activityValidate.error) return next();
  return res.status(400).json({
    message: `There was an error in the validation: ${activityValidate.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

export default isValidActivity;
