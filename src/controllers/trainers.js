import Trainer from '../models/Trainer';

export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrainer = await Trainer.findOneAndDelete({ id });
    if (!deletedTrainer) {
      return res.status(404).send('Trainer not found');
    }
    return res.send('Trainer deleted');
  } catch (error) {
    return res.send(error);
  }
};
export const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrainer = await Trainer.findOneAndUpdate(
      { id },
      req.body,
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
    return res.status(500).send(error);
  }
};
