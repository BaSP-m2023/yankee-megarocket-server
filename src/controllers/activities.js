import Activities from '../models/Activity';

export const getActivities = async (req, res) => {
  try {
    const activity = await Activities.find();
    if (!activity.length) {
      return res.status(404).json({
        message: 'There are no activities!',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Activities found successfully!',
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

export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activities.findById(id);
    if (!activity) {
      return res.status(404).json({
        message: `Activity with: ${id} not found!`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Activity found successfully!',
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

export const postActivity = async (req, res) => {
  try {
    const body = req;
    const createdActivity = await Activities.create(body);
    if (!createdActivity) {
      return res.status(400).json({
        message: 'Activity could not be created!',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Activity created successfully!',
      data: createdActivity,
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

export const putActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updateActivity = await Activities.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!updateActivity) {
      return res.status(400).json({
        message: 'Activity could not be found and updated!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Activity was updated successfully!',
      data: updateActivity,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
      data: undefined,
      error: true,
    });
  }
};

export const deleteActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activities.findByIdAndDelete(id);
    if (!deletedActivity) {
      return res.status(404).json({
        message: 'Activity could not be found and updated!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Activity was deleted successfully!',
      data: deletedActivity,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
      data: undefined,
      error: true,
    });
  }
};
