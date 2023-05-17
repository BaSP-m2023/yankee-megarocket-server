import { isValidObjectId } from 'mongoose';

import Subscription from '../models/Subscription';

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    if (!subscriptions) {
      return res.status(404).json({
        message: 'There are no subscriptions created',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscriptions list',
      data: subscriptions,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error!',
      data: undefined,
      error: true,
    });
  }
};

export const getSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: 'This is not a valid ID',
        data: [],
        error: true,
      });
    }
    const foundSubscription = await Subscription.findById(id);
    if (!foundSubscription) {
      return res.status(404).json({
        message: 'subscription not found',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The subscription has been found',
      data: foundSubscription,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

export const createSubscription = async (req, res) => {
  try {
    const { body } = req;
    const createSub = await Subscription.create(body);
    return res.status(201).json({
      message: 'The subscription has been created',
      data: createSub,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      data: undefined,
      error: true,
    });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: 'This is not a valid ID',
        data: {},
        error: true,
      });
    }
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!updatedSubscription) {
      return res.status(404).json({
        message: 'Subscription Not Found',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscription Updated',
      data: {
        body,
      },
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

export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: 'This is not a valid ID',
        data: {},
        error: true,
      });
    }
    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) {
      return res.status(404).json({
        message: `This id was not found ${id}`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscription Deleted',
      data: deletedSubscription,
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
