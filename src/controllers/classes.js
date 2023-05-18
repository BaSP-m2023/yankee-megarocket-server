import Class from '../models/Class';

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      body,
    } = req;
    const foundClass = await Class.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );
    if (!foundClass) {
      return res.status(404).json({
        message: `Class with id: ${id} not found`,
        data: {},
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Class updated succesfully',
      data: foundClass,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      data: undefined,
      error: true,
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const foundClass = await Class.findByIdAndDelete(id);
    if (!foundClass) {
      return res.status(404).json({
        message: `Class with id: ${id} not found`,
        data: {},
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Class deleted succesfully',
      data: foundClass,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error. Class was not deleted',
      data: undefined,
      error: true,
    });
  }
};

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
