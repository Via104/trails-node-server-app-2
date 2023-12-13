import * as dao from "./dao.js";

function AddTrailRoutes(app) {
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

  const deleteTrail = async (req, res) => {
    try {
      const { trailId } = req.params.trailId;
      const currentTrail = await dao.findTrailById(trailId);
      if (currentTrail) {
        const status = await dao.deleteTrail(trailId);
        return res.json(status);
      }
    } catch (error) {
      console.error("Error creating trail:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };

  const fetchAllCustomizedTrails = async (req, res) => {
    const trails = await dao.findAllTrails();
    res.json(trails);
  };

  // create a trail in db
  app.post("/api/addTrails/create", createTrail);
  // fetch all trails in db
  app.get("/api/addTrails", fetchAllCustomizedTrails);
  //delete a trail in db
  app.delete("/api/addTrails/:trailId", deleteTrail);
}

export default AddTrailRoutes;
