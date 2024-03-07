import * as dao from "./dao.js";

function UserRoutes(app) {
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
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
      // alert("Username already taken");
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    console.log('**Signin**')
    const { username, password } = req.body;
    // console.log(`username: ${username}, pass: ${password}`)
    const currentUser = await dao.findUserByCredentials(username, password);
    // console.log(`Current user: ${currentUser}`)
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      // console.log("current user saved in req.session")
      console.log("req session user: " + req.session["currentUser"]);
      res.json(currentUser);
    } else {
      res.status(400).json({ message: "Wrong username or password" });
    }
  };

  const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = req.body;

    console.log("Update received user: " + user.password);
    console.log("id: " + id);
    const status = await dao.updateUser(id, user);
    res.json(status);

  };

  const signout = (req, res) => {
    console.log('**Signout**')
    console.log('destroying')
    req.session.destroy();
    res.sendStatus(200);
  };

  const account = async (req, res) => {
    if (req.session['currentUser']) {
      console.log('**Account**')
      console.log("Server user: " + req.session['currentUser'].username);
      res.json(req.session['currentUser'])
    } else {
      res.json({})
    }
  };

  const favorites = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user.favourites);
  };

  const updateFavourites = async (req, res) => {
    const { userId } = req.params;
    const { user, favs } = req.body;
    const status = await dao.updateFavs(userId, favs);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    console.log(`favs length: ${currentUser.favourites.length}`)
    console.log(currentUser.favourites)
    res.json(currentUser);
  };

  const updateTrail = async (req, res) => {
    const { userId } = req.params;
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    const newTrail = req.body;
    console.log(newTrail);
    const status = await dao.replaceTrail(userId, newTrail);
    res.json(status);
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users/account", account);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.put("/api/users/:id", updateUser);
  app.put("/api/users/favourites/:userId", updateFavourites);
  app.get("/api/users/:userId/favorites", favorites);
  app.put("/api/users/:userId/:trailId", updateTrail);
}
export default UserRoutes;
