import Joi from 'joi';

const validateSubscription = Joi.object({
  classId: Joi.string().max(9).required(),
  memberId: Joi.string().max(9).required(),
  date: Joi.date().greater('now').required(),
});

export default validateSubscription;
