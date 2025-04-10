import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/users.model.js";

const authorize = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decode.userId);
      if (!user) return res.status(401).json({ message: "unauthorized1" });
      req.user = user;
      return next();
    }
    return res.status(401).json({ message: "unauthorized2" });
  } catch (error) {
    next(error);
  }
};

export default authorize;
