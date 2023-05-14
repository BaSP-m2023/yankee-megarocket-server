import Subscription from '../models/Subscription';

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    return res.send(subscriptions);
  } catch (error) {
    return res.send(error);
  }
};

export const getSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSubscription = await Subscription.findById((subscription) => subscription.id === id);
    if (!foundSubscription) {
      return res.status(400).json({
        message: 'subscription not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json(foundSubscription);
  } catch (error) {
    return res.send(error);
  }
};
