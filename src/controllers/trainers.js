import Trainer from '../models/Trainer';

export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrainer = await Trainer.findOneAndDelete(id);
    if (!deletedTrainer) {
      return res.status(404).json({
        message: 'Trainer not found',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer deleted',
      data: deletedTrainer,
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

export const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!updatedTrainer) {
      return res.status(404).json({
        message: 'Trainer not found',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer updated',
      data: updatedTrainer,
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
