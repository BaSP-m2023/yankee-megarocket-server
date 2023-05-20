const Joi = require('joi');

const validSubscription = (req, res, next) => {
  const validateData = Joi.object({
    classId: Joi.string().required(),
    members: Joi.array().items(Joi.string()).required(),
    date: Joi.date().greater('now').required(),
  });

  const subscriptionData = validateData.validate(req.body);
  if (!subscriptionData.error) return next();
  return res.status(400).json({
    message: `An error has occurred: ${subscriptionData.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

export default validSubscription;
