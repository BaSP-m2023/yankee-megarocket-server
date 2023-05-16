import Class from '../models/Class';

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();

    if (classes.length === 0) {
      return res.status(404).json({
        message: 'Classes not found',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Classes found',
      data: classes,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const getClass = async (req, res) => {
  try {
    const { id } = req.params;
    const foundClass = await Class.findById(id);
    if (!foundClass) {
      return res.status(404).json({
        message: 'Class not found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Class found',
      data: foundClass,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const createClass = async (req, res) => {
  try {
    const {
      activityId, hour, day, trainerId, maxCapacity,
    } = req.body;
    const newClass = await Class.create({
      activityId, hour, day, trainerId, maxCapacity,
    }); return res.status(201).json({
      message: 'New class created successfully!',
      data: newClass,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};

const classesController = {
  getClass,
  getClasses,
  createClass,
};

export default classesController;
