import Subscription from '../models/Subscription';

export const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('members')
      .populate('classes');
    if (!subscriptions.length) {
      return res.status(404).json({
        message: 'There are no subscriptions!',
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscriptions found successfully!',
      data: subscriptions,
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

export const getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id)
      .populate('members')
      .populate('classes');
    if (!subscription) {
      return res.status(404).json({
        message: `Subscription with id: ${id} not found!`,
        data: [],
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscription found successfully!',
      data: subscription,
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

export const postSubscription = async (req, res) => {
  try {
    const { body } = req;
    const createdSubscription = await Subscription.create(body);
    if (!createdSubscription) {
      return res.status(400).json({
        message: 'Subscription could not be found and created!',
        data: {},
        error: true,
      });
    }
    return res.status(201).json({
      message: 'Subscription created successfully!',
      data: createdSubscription,
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

export const putSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );
    if (!updatedSubscription) {
      return res.status(400).json({
        message: 'Subscription could not be found and updated!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscription Updated Successfully!',
      data: updatedSubscription,
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

export const deleteSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubscription = await Subscription.findByIdAndDelete(id);
    if (!deletedSubscription) {
      return res.status(400).json({
        message: 'Subscription could not be found and deleted!',
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Subscription Deleted Successfully!',
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
