import * as dao from "./dao.js";

function TrailRoutes(app) {
  const createLikedTrail = async (req, res) => {
    try {
      const {trailId} = req.params
      const {userId, name, description } = req.body;
      const currentTrail = await dao.findLikedTrailById(trailId);
      if (!currentTrail) {
        const trail = await dao.createLikedTrail(
          trailId,
          name,
          // url,
          // length,
          description
        );
        return res.json(trail);
      }
      return res.json(currentTrail);
    } catch (error) {
      console.error("Error creating trail:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  const findAllLikedTrails = async (req, res) => {
    const trails = await dao.findAllLikedTrails();
    res.json(trails);
  };

  const findUsersByLikedTrailId = async (req, res) => {
    const { trailId } = req.params;
    const trail = await dao.findLikedTrailById(trailId);
    res.json(trail.users);
  };

  const addUser = async (req, res) => {
    const { trailId } = req.params;
    const {users} = req.body
    const status = await dao.updateUsers(trailId, users);
    res.json(status);
  };
  

  const updateLikedTrail = async (req, res) => {
    const { trailId } = req.params;
    const newTrail = req.body;
    // const trail = await dao.findTrailById(trailId);
    const status = await dao.updateLikedTrail(newTrail);
    res.json;
  };

  // create a trail in db
  app.post("/api/trails/:trailId", createLikedTrail);
  // get all trails
  app.get("/api/trails", findAllLikedTrails);
  // get all users who favored this trail
  app.get("/api/trails/:trailId/users", findUsersByLikedTrailId);
  // update list of users who favored this trail
  app.put("/api/trails/:trailId/users", updateUsers);
  // update trail info
  app.put("/api/trails/:trailId", updateLikedTrail);
}

export default TrailRoutes;