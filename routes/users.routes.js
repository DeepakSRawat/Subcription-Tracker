import { Router } from "express";
import { getAllUsers, getUser } from "../controller/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", authorize, getUser);
userRoutes.post("/", (req, res) => {
  res.send("create an user");
});
userRoutes.put("/:id", (req, res) => {
  res.send("update an user");
});
userRoutes.delete("/:id", (req, res) => {
  res.send("delete an user");
});

export default userRoutes;
