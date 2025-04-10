import Subscription from "../models/subsriptions.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    console.log("idkjlk::", req);
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const subsriptions = await Subscription.find({ user: req.user.id });
    res.status(200).json({ success: true, data: subsriptions });
  } catch (error) {
    next(error);
  }
};
