import Trainer from '../models/Trainer';

export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    if (!trainers.length) {
      return res.status(404).json({
        message: 'There are no trainers!',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainers found successfully!',
      data: trainers,
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

export const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({
        message: `Trainer with id: ${id} not found!`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer found successfully!',
      data: trainer,
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

export const postTrainer = async (req, res) => {
  try {
    const { body } = req;
    const trainer = await Trainer.create(body);
    if (!trainer) {
      return res.status(400).json({
        message: 'Trainer could not be found and created!',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Trainer was created successfully!',
      data: trainer,
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
export const putTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!updatedTrainer) {
      return res.status(400).json({
        message: 'Trainer could not be found and updated!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer updated successfully',
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
export const deleteTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrainer = await Trainer.findByIdAndDelete(id);
    if (!deletedTrainer) {
      return res.status(400).json({
        message: 'Trainer could not be found and deleted!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer deleted successfully!',
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
