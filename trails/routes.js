import * as dao from "./dao.js";

function TrailRoutes(app) {
  const createTrail = async (req, res) => {
    try {
      const { trailId, userId, name, url, length, description } = req.body;
      const currentTrail = await dao.findTrailById(trailId);
      if (!currentTrail) {
        const trail = await dao.createTrail(
          trailId,
          name,
          url,
          length,
          description,
          userId
        );
        return res.json(trail);
      }
      return res.json(currentTrail);
    } catch (error) {
      console.error("Error creating trail:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  const findAllFavTrails = async (req, res) => {
    const trails = await dao.findAllFavTrails();
    res.json(trails);
  };

  const findAllUsersByTrailId = async (req, res) => {
    const { trailId } = req.params;
    const trail = await dao.findTrailById(trailId);
    res.json(trail.users);
  };

  const updateUsers = async (req, res) => {
    const { trailId } = req.params;
    const status = await dao.updateUsers(trailId, req.body);
    res.json(status);
  };

  const updateTrail = async (req, res) => {
    const { trailId } = req.params;
    const newTrail = req.body;
    // const trail = await dao.findTrailById(trailId);
    const status = await dao.updateTrail(newTrail);
    res.json;
  };

  // create a trail in db
  app.post("/api/trails/create", createTrail);
  // get all trails
  app.get("/api/trails", findAllFavTrails);
  // get all users who favored this trail
  app.get("/api/trails/:trailId/users", findAllUsersByTrailId);
  // update list of users who favored this trail
  app.put("/api/trails/:trailId/users", updateUsers);
  // update trail info
  app.put("/api/trails/:trailId", updateTrail);
}

export default TrailRoutes;
