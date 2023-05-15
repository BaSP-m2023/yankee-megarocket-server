const Joi = require('joi');

const validateSubCreation = (req, res, next) => {
  const validateSubscription = Joi.object({
    classId: Joi.string().max(24).required(),
    memberId: Joi.string().max(24).required(),
    date: Joi.date().greater('now').required(),
  });

  const subscriptionData = validateSubscription.validate(req.body);
  if (!subscriptionData.error) return next();
  return res.status(400).json({
    message: `An error has occurred: ${subscriptionData.error.details[0].message}`,
    data: undefined,
    error: true,
  });
};

module.exports = { validateSubCreation };
