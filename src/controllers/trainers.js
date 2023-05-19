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
        message: `Trainer with: ${id} not found!`,
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
    const body = req;
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
