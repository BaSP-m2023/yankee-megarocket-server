const Class = require('../models/Class');

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      activityId, hour, day, trainerId, maxCapacity,
    } = req.body;
    const foundClass = await Class.findByIdAndUpdate(
      id,
      {
        activityId,
        hour,
        day,
        trainerId,
        maxCapacity,
      },
      {
        new: true,
      },
    );
    if (!foundClass) {
      return res.status(404).json({
        msg: `Class with id: ${id} not found`,
        data: [{}],
        error: false,
      });
    }
    return res.status(200).json({
      msg: 'Class updated succesfully',
      data: foundClass,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Server error',
      data: error,
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
        msg: `Class with id: ${id} not found`,
        data: [{}],
        error: false,
      });
    }
    return res.status(200).json({
      msg: 'Class deleted succesfully',
      data: foundClass,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Server error. Class was not deleted',
      data: [],
      error: true,
    });
  }
};

module.exports = {
  deleteClass,
  updateClass,
};
