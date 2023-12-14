import model from "./model.js";

export const findTrailById = (trailId) => model.findOne({ trailId: trailId });

// create a trail in db
export const createTrail = (trailId, name, city, region, thumbnail, description) =>
  model.create({
    trailId: trailId,
    name: name,
    city: city,
    region: region,
    thumbnail: thumbnail,
    description: description
  });

export const updateLikedUsers = (trailId, users) =>
  model.updateOne({ _id: trailId }, { $set: { users: users } });

  export const updateCount = (trailId, count) =>
  model.updateOne({ _id: trailId }, { $set: { count: count } });
// remove trail
export const deleteTrail = (trailId) => model.deleteOne({ trailId: trailId });

// find all trails
export const findAllTrails = () => model.find().sort({count:-1}).populate('users').exec();

// // fetch all favourited trails in db
// export const findAllFavTrails = () => model.find();

// // add/remove users who favored this trail
// export const updateUsers = (trailId, users) =>
//   model.updateOne({ trailId: trailId }, { $addToSet: { users: users } });

// export const updateTrail = (trail) =>
//   model.updateOne({ trailId: trail.id }, { $set: trail });
