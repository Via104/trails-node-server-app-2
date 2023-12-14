import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import LikesRoutes from "./likes/routes.js";
import AddTrailRoutes from "./addTrails/routes.js";
import likedTrailRoutes from "./likedTrails/routes.js";
import "dotenv/config"

// const CONNECTION_STRING =
  // process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/trails-app";
// const CONNECTION_STRING =
//   process.env.DB_CONNECTION_STRING;
const CONNECTION_STRING = "mongodb+srv://giuseppi:supersecretpassword@cluster0.udcgx5m.mongodb.net/trails-app?retryWrites=true&w=majority"
console.log(CONNECTION_STRING)
// mongoose.connect("mongodb://127.0.0.1:27017/trails-app");
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    // origin: "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
AddTrailRoutes(app)
likedTrailRoutes(app);
LikesRoutes(app)

// app.use(cors());
app.listen(4000);
