import { isValidObjectId } from 'mongoose';
import Activity from '../models/Activity';

export const getActivity = async (req, res) => {
  try {
    const activity = await Activity.find();
    if (!activity) {
      return res.status(404).json({
        message: 'There are no activities created',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'This is a list of our activities',
      data: activity,
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
export const getActivityId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: 'This is not a valid Activity ID',
        data: {},
        error: true,
      });
    }
    const foundActivity = await Activity.findById(id);
    if (!foundActivity) {
      return res.status(404).json({
        message: 'Activity not found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Here is the requested activity',
      data: foundActivity,
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
export const createActivity = async (req, res) => {
  try {
    const {
      activityName, activityDescription,
    } = req.body;
    if (!activityName || !activityDescription) {
      return res.status(400).json({
        message: 'Theres a missing field',
        data: {},
        error: true,
      });
    }
    await Activity.create({
      activityName,
      activityDescription,
    });
    return res.status(201).json({
      message: 'Activity created',
      data: Activity,
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
