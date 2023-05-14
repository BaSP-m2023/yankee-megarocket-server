import Class from '../models/Class';

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({});

    if (classes.length === 0) {
      return res.status(400).json({
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
      message: 'Server error',
      data: error,
      error: true,
    });
  }
};

const getClass = async (req, res) => {
  try {
    const { id } = req.params;
    const foundClass = await Class.find((cl) => cl.id === id);
    return res.send(foundClass);
  } catch (error) {
    return res.send(error);
  }
};

const classesController = {
  getClass,
  getClasses,
};

export default classesController;
