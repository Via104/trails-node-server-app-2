import * as dao from "./dao.js";

function LikesRoutes(app) {

  const createUserLikesTrail = async (req, res) => {
    console.log('**createUserLikesTrail**')
    const { userId } = req.params;
    const trail = req.body;
    console.log(trail)
    if (userId) {
      try{
        const like = await dao.createUserLikesTrail(userId, trail);
        res.json(like);
      }
      catch (error) {
        console.log(error)
        res.status(500).json({error: 'createUserLikesTrail failed'})
      }
    }
    else {
      res.sendStatus(500)
    }
  };

  const deleteUserLikesTrail = async (req, res) => {
    console.log("deleteUserLikesTrail**")
    const { userId, trailId } = req.params;
    if (userId) {
      try {
        const status = await dao.deleteUserLikesTrail(userId, trailId);
        console.log(status)
        res.json(status);
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      res.sendStatus(500).json({error: 'deleteUserLikesTrail failed'})
    }
  };

  const findUsersOfLikedTrail = async (req, res) => {
    console.log('**findUsersOfLikedTrail**')
    const { trailId } = req.params;
    console.log(typeof(trailId))
    const users = await dao.findUsersOfLikedTrail(trailId);
    console.log(users)
    res.json(users);
  };
  const findTrailsLikedByUser = async (req, res) => {
    const { userId } = req.params;
    const trails = await dao.findTrailsLikedByUser(userId);
    res.json(trails);
  };
  const findLikes = async (req, res) => {
    console.log("**findLikes**")
    const trails = await dao.findLikes();
    res.json(trails);
  };
  // const findLikesForTrail = async (req, res) => {
  //   console.log("**findLikedTrail**")
  //   const {trailId} = req.params
  //   const likes = await dao.findLikesForTrail(trailId);
  //   res.json(likes);
  // };
  

  app.post("/api/likes/users/:userId/trails", createUserLikesTrail);
  app.delete("/api/likes/users/:userId/trails/:trailId", deleteUserLikesTrail);
  app.get("/api/likes/trails/:trailId/users", findUsersOfLikedTrail);
  app.get("/api/likes/users/:userId/trails", findTrailsLikedByUser);
  // app.get("/api/likes/trails/:trailId", findLikedTrail)
  app.get("/api/likes", findLikes);
}

export default LikesRoutes;