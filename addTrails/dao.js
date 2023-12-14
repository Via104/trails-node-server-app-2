import model from "./model.js";

export const findTrailById = (trailId) => model.findOne({ trailId: trailId });

// create a trail in db
export const createTrail = (trailId, name, url, length, description) =>
  model.create({
    trailId: trailId,
    name: name,
    url: url,
    length: length,
    description: description,
  });

// remove trail
export const deleteTrail = (trailId) => model.deleteOne({ trailId: trailId });

// find all trails
export const findAllTrails = () => model.find();
