import * as dao from "./dao.js";

function likedTrailRoutes(app) {
  const createTrail = async (req, res) => {
    try {
      const { trailId, name, city, region, thumbnail, description } = req.body;
      const currentTrail = await dao.findTrailById(trailId);
      if (!currentTrail) {
        const trail = await dao.createTrail(
          trailId,
          name,
          city,
          region,
          thumbnail,
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
  const addLikedUser = async(req, res) => {
    const {trailId} = req.params
    const {trail} = req.body
    let currentTrail = await dao.findTrailById(trailId);
    const currentUser = ["currentUser"]
    console.log('In addLikedUsers')
    console.log(currentUser)
    if (!currentTrail) {
      currentTrail = await dao.createTrail(
        trailId,
        trail.name,
        trail.city,
        trail.region,
        trail.thumbnail,
        trail.description
      );
    }
    const updatedUsers = [...currentTrail.users, currentUser._id]
    let status = await dao.updateLikedUsers(currentTrail._id, updatedUsers);
    status = await dao.updateCount(currentTrail._id, currentTrail.count + 1)
    const updatedTrail = await dao.findTrailById(trailId);
    // currentTrail.users = updatedUsers
    console.log("Adding liked user")
    console.log(updatedTrail)
    res.json(updatedTrail)
  }
  const removeLikedUser = async(req, res) => {
    const {trailId} = req.params
    const currentTrail = await dao.findTrailById(trailId);
    const currentUser = ['currentUser']
    console.log('In removeLikedUsers')
    console.log(currentUser._id)
    if (!currentTrail) {
      console.log('cannot remove like from unliked trail')
      
    }
    else {

      const updatedUsers = currentTrail.users.filter((u) => u._id.toString() !== currentUser._id)
      if (updatedUsers.length === 0) {
        console.log('this trail is no longer liked')
        const status = await dao.deleteTrail(trailId);
      }
      else {
        let status = await dao.updateLikedUsers(currentTrail._id, updatedUsers);
        status = await dao.updateCount(currentTrail._id, currentTrail.count - 1)
        const updatedTrail = await dao.findTrailById(trailId);
        // currentTrail.users = updatedUsers
        console.log("removing liked user")
        console.log(updatedTrail)
        res.json(updatedTrail)
      }
    }
    
  }

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

  const fetchAllTrails = async (req, res) => {
    const trails = await dao.findAllTrails();
    res.json(trails);
  };

  // create a trail in db
  app.post("/api/trails/create", createTrail);

  //delete a trail in db
  app.delete("/api/trails/:trailId", deleteTrail);

  // fetch all trails in db
  app.get("/api/likedTrails", fetchAllTrails);
  app.put("/api/likedTrails/:trailId/users/add", addLikedUser);
  app.put("/api/likedTrails/:trailId/users/remove", removeLikedUser);



  // const findAllFavTrails = async (req, res) => {
  //   const trails = await dao.findAllFavTrails();
  //   res.json(trails);
  // };

  // const findAllUsersByTrailId = async (req, res) => {
  //   const { trailId } = req.params;
  //   const trail = await dao.findTrailById(trailId);
  //   res.json(trail.users);
  // };

  // const updateUsers = async (req, res) => {
  //   const { trailId } = req.params;
  //   const status = await dao.updateUsers(trailId, req.body);
  //   res.json(status);
  // };

  // const updateTrail = async (req, res) => {
  //   const { trailId } = req.params;
  //   const newTrail = req.body;
  //   // const trail = await dao.findTrailById(trailId);
  //   const status = await dao.updateTrail(newTrail);
  //   res.json;
  // };

  // get all trails
  // app.get("/api/trails", findAllLikedTrails);
  // // get all users who favored this trail
  // app.get("/api/trails/:trailId/users", findAllUsersByTrailId);
  // // update list of users who favored this trail
  // app.put("/api/trails/:trailId/users", updateLikeUsers);
  // // update trail info
  // app.put("/api/trails/:trailId", updateTrail);
}

export default likedTrailRoutes;
