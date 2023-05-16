import Class from '../models/Class';

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      body
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
