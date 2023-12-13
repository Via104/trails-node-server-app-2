import model from "./model.js";

export const findLikedTrailById = (trailId) => model.findOne({ trailId: trailId });

// create a trail in db
export const createLikedTrail = (trailId, name, description, userId) =>
  model.create({
    trailId: trailId,
    name: name,
    // url: url,
    // length: length,
    description: description,
    users: [],
  });

// fetch all favourited trails in db
export const findAllLikedTrails = () => model.find().populate('users').exec();

// add/remove users who favored this trail
export const updateUsers = (trailId, user) =>
  model.updateOne({ trailId: trailId }, { $addToSet: { users: user } });

export const updateLikedTrail = (trail) =>
  model.updateOne({ trailId: trail.id }, { $set: trail });