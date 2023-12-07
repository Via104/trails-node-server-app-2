import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (usr, pass) =>
  model.findOne({ username: usr, password: pass });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const updateFavs = (userId, favourites) =>
  model.updateOne({ _id: userId }, { $set: { favourites: favourites } });
  
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
