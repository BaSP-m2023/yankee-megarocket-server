import { isValidObjectId } from 'mongoose';

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'This is not a valid object Id',
      data: {},
      error: true,
    });
  }
  return next();
};

export default validateId;
