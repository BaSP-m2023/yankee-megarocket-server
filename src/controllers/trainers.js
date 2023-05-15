import Trainer from '../models/Trainer';

export const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    if (trainers.length === 0) {
      return res.status(404).json({
        message: 'No trainers found',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainers found',
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

//= ==========================================================================

export const getTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const foundTrainer = await Trainer.findById(id);
    if (!foundTrainer) {
      return res.status(404).json({
        message: 'Trainer not found',
        data: id,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer found',
      data: foundTrainer,
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

//= ==========================================================================

export const createTrainer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dni,
      email,
      phone,
      password,
      rate,
    } = req.body;
    const trainer = await Trainer.create({
      firstName,
      lastName,
      dni,
      email,
      phone,
      password,
      rate,
    });
    res.status(201).json({
      message: 'Trainer was created successfully!',
      data: trainer,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      data: undefined,
      error: true,
    });
  }
};
