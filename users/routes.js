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
      alert("Username already taken");
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    // console.log(`username: ${username}, pass: ${password}`)
    const currentUser = await dao.findUserByCredentials(username, password);
    // console.log(`Current user: ${currentUser}`)
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(400).json({ message: "Wrong username or password" });
    }
  };

  const signout = (req, res) => {
    console.log('destroying')
    req.session.destroy();
    res.sendStatus(200);
  };

  const account = async (req, res) => {
    // console.log(req.session)
    if (!req.session['currentUser']) {
      res.status(404).json({ message: "You are not signed in." })
      return;
    }
    res.json(req.session['currentUser']);
  };

  const favorites = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user.favorites);
  };

  const addToFavorites = async (req, res) => {
    const { userId } = req.params;
    const { user, trail } = req.body;
    console.log(`userId: ${userId}`)
    console.log(`old user: ${user}`)
    const favs = [...user.favorites, trail];
    const status = await dao.updateFavs(userId, favs);
    const currentUser = await dao.findUserById(userId);
    console.log(`new user: ${currentUser}`)
    console.log(`favorite count:  ${currentUser.favorites.length}`)
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const updateTrail = async (req, res) => {
    const { trailId } = req.params;
    
  };

  // users
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);

  // trails
  app.get("/api/users/:userId/favorites", favorites);
  app.put("/api/users/favorites/:userId", addToFavorites);
  app.put("/api/trails/:trailId", updateTrail);
}
export default UserRoutes;
