import model from "./model.js";

export const findTrailById = (trailId) => model.findOne({ trailId: trailId });

// create a trail in db
export const createTrail = (trailId, name, url, length, description, userId) =>
  model.create({
    trailId: trailId,
    name: name,
    url: url,
    length: length,
    description: description,
    users: [userId],
  });

// fetch all favourited trails in db
export const findAllFavTrails = () => model.find();

// add/remove users who favored this trail
export const updateUsers = (trailId, users) =>
  model.updateOne({ trailId: trailId }, { $addToSet: { users: users } });

export const updateTrail = (trail) =>
  model.updateOne({ trailId: trail.id }, { $set: trail });
