import Activity from '../models/Activity';

export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { activityName, activityDescription } = req.body;
    const findActivity = await Activity.findByIdAndUpdate(
      id,
      { activityName, activityDescription },
      { new: true },
    );
    if (!findActivity) {
      return res.status(404).json({
        msg: `The activity with id: ${id} was not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Activity updated successfully!',
      data: findActivity,
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

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const findActivity = await Activity.findByIdAndDelete(id);
    if (!findActivity) {
      return res.status(404).json({
        msg: `The activity with id: ${id} was not found`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      msg: 'Activity deleted successfully!',
      data: findActivity,
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
