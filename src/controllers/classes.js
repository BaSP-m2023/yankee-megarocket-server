import Classes from '../models/Class';
import Trainer from '../models/Trainer';
import Activity from '../models/Activity';

export const getClasses = async (req, res) => {
  try {
    const classes = await Classes.find()
      .populate({
        path: 'activityId',
        select: 'activityName activityDescription',
        model: Activity,
      })
      .populate({
        path: 'trainerId',
        select: 'firstName lastName email',
        model: Trainer,
      });

    if (!classes.length) {
      return res.status(404).json({
        message: 'There are no classes!',
        data: [],
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Classes found successfully!',
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

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundClass = await Classes.findById(id)
      .populate('activityId')
      .populate('trainerId');

    if (!foundClass) {
      return res.status(404).json({
        message: `Class with id: ${id} not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Class found successfully',
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

export const postClass = async (req, res) => {
  try {
    const { body } = req;
    const createdClass = await Classes.create(body);
    if (!createdClass) {
      return res.status(400).json({
        message: 'Class could not be created!',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Class created successfully!',
      data: createdClass,
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

export const putClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedClass = await Classes.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!updatedClass) {
      return res.status(400).json({
        message: 'Class could not be found and updated!',
        data: {},
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Class was updated succesfully',
      data: updatedClass,
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

export const deleteClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await Classes.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(400).json({
        message: 'Class could not be found and updated!',
        data: {},
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Class deleted succesfully',
      data: deletedClass,
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
