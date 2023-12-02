import * as dao from "./dao.js";

function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    console.log(user);
    res.json(user);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      alert("Username already taken");
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(400).json({ message: "Wrong username or password" });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    res.json(currentUser);
  };

  const favourites = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user.favourites);
  };

  const addToFavourites = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body.favourites);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId/favourites", addToFavourites);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
  app.post("/api/users/:userId/favourites", favourites);
}
export default UserRoutes;
