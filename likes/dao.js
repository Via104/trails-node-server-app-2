import model from "./model.js";

export const createUserLikesTrail = (userId, trailId, title, description) =>
  model.create({ user: userId, trailId, title, description });

export const deleteUserLikesTrail = (userId, trailId) =>
  model.deleteOne({ user: userId, trailId });

export const findUsersLikedTrail = (trailId) =>
  model.find({ trailId }).populate("user").exec();

export const findTrailsLikedByUser = (userId) => model.find({ user: userId });
export const findLikedTrails = () => model.find().populate("user").exec();