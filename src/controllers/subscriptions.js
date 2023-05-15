import Subscription from '../models/Subscription';

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    return res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const foundSubscription = await Subscription.findById(id);
    if (!foundSubscription) {
      return res.status(404).json({
        message: 'subscription not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json(foundSubscription);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSubscription = async (req, res) => {
  try {
    const { classId, memberId, date } = req.body;
    const createSub = await Subscription.create({
      classId,
      memberId,
      date,
    });
    return res.status(200).json(createSub);
  } catch (error) {
    return res.status(500).json(error);
  }
};
