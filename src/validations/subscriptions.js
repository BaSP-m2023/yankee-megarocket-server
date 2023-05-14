import Joi from 'joi';

const validateSubscription = Joi.object({
  classId: Joi.string().max(10).required(),
  memberId: Joi.string().max(10).required(),
  date: Joi.date().greater('now').required(),
});

export default validateSubscription;
