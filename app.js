import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";

import UserRoutes from "./users/routes.js";
// import TrailRoutes from "./trails/routes.js";

const CONNECTION_STRING =
  process.env.CONNECTION_STRING || "mongodb://127.0.0.1:27017/trails-app";
mongoose.connect("mongodb://127.0.0.1:27017/trails-app");

const app = express();
app.use(
  cors({
    credentials: true,
    // origin: process.env.FRONTEND_URL,
    origin: "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
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
// TrailRoutes(app);

// app.use(cors());
app.listen(4000);
