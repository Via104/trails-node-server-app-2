import * as dao from "./dao.js";

function LikesRoutes(app) {
  const createUserLikesTrail = async (req, res) => {
    const { userId, trailId} = req.params;
    const { title, description} = req.body;
    if (userId === undefined) {
      const user = req.session.currentUser._id;
      const like = await dao.createUserLikesTrail(user, trailId, title, description);
      res.json(like);
      return;
    }
    const like = await dao.createUserLikesTrail(userId, trailId, title, description);
    res.json(like);
  };
  const deleteUserLikesTrail = async (req, res) => {
    const { userId, trailId } = req.params;
    if (userId === undefined) {
      const user = req.session.currentUser._id;
      console.log('deleting like')
      console.log(user)
      const status = await dao.deleteUserLikesTrail(user, trailId);
      console.log(status)
      res.json(status);
      return;
    }
    const status = await dao.deleteUserLikesTrail(userId, trailId);
    res.json(status);
  };
  const findUsersOfLikedTrail = async (req, res) => {
    const { trailId } = req.params;
    const users = await dao.findUsersLikedTrail(trailId);
    res.json(users);
  };
  const findTrailsLikedByUser = async (req, res) => {
    const { userId } = req.params;
    const trails = await dao.findTrailsLikedByUser(userId);
    res.json(trails);
  };
  const findLikes = async (req, res) => {
    const trails = await dao.findLikes();
    res.json(trails);
  };
  

  app.post("/api/likes/user/trail/:trailId", createUserLikesTrail);
  app.delete("/api/likes/trail/:trailId", deleteUserLikesTrail);
  app.get("/api/likes/trails/:trailId", findUsersOfLikedTrail);
  app.get("/api/likes/user/:userId", findTrailsLikedByUser);
  app.get("/api/likes", findLikes);
}

export default LikesRoutes;