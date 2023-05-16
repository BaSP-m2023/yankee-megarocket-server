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
    return res.status(200).json({
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
