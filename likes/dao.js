import model from "./model.js";

export const createUserLikesTrail = (userId, trailId, title, description) =>
  model.create({ user: userId, trailId, title, description });

export const deleteUserLikesTrail = (userId, trailId) =>
  model.deleteOne({ user: userId, trailId });

// Find all users that liked the trail with the given trailId
export const findUsersOfLikedTrail = (trailId) =>
  model.find({ trailId }).populate("user").exec();
  
// finds all trails liked by the user with the given userId
export const findTrailsLikedByUser = (userId) => model.find({ user: userId });

export const findLikes = () => {
  return model.aggregate([
    {$group: {_id: "$trailId", count: {$sum: 1}, users: {$push: "$user"}, doc: {$first: "$$ROOT"}}},
    {$sort: {count: -1}},
    {$lookup: {from: "users", localField: "users", foreignField: "_id", as: "user_docs"}},
    {$replaceRoot: {newRoot: {$mergeObjects: [{count: "$count", users: "$users", user_docs: "$user_docs"}, "$doc"]}}}
    ]);
}