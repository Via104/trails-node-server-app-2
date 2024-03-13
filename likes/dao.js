import model from "./model.js";

export const createUserLikesTrail = (userId, trail) =>
  model.create({ user: userId, 
    trailId: trail.id,
    name: trail.name,
    city: trail.city, 
    region: trail.region,
    description: trail.description,
    thumbnail: trail.thumbnail});

export const deleteUserLikesTrail = (userId, trailId) =>
  model.deleteOne({ user: userId, trailId: trailId});

// Find all users that liked the trail with the given trailId
export const findUsersOfLikedTrail = (trailId) => {
  return model.aggregate([
    {$match: {trailId: trailId}},
    {$group: {_id: null, users: {$push: '$user'}}},
    {$lookup: {from: 'users', localField: 'users', foreignField: '_id', pipeline: [{$project: {_id: 1, username: 1}}], as: 'users'}},
    {$project: {users: 1, _id: 0}}
  ]);
}
  
// finds all trails liked by the user with the given userId
export const findTrailsLikedByUser = (userId) => model.find({ user: userId });

export const findLikes = () => {
  return model.aggregate([
    // group by trailId, count the number of entries, gather all the user fields of each entry into one array, get first document for this trail as "doc"
    {$group: {_id: "$trailId", count: {$sum: 1}, users: {$push: "$user"}, doc: {$first: "$$ROOT"}}},
    // sort by count in descending order
    {$sort: {count: -1}},
    // create new field user_docs with the full document for each user in the users array
    {$lookup: {from: "users", localField: "users", foreignField: "_id", as: "user_docs"}},
    // replace root with count, users, and user_docs, and fields in "doc"
    {$replaceRoot: {newRoot: {$mergeObjects: [{count: "$count", users: "$users", user_docs: "$user_docs"}, "$doc"]}}}
    ]);
}

export const findLike = (userId, trailId) => model.find({userId: userId, trailId: trailId})

